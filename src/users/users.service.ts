import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument, UserRole } from './user.schema';
import { Model, Types } from 'mongoose';
import { encryptPassword } from 'src/utils';
import { ADMIN_EMAILS } from 'src/constants/user.constants';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserDto, optionsUser } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>
  ) { }

  async createUser(newUser) {
    const checkUser = await this.findOne(newUser.email)
    if (checkUser) {
      return checkUser;
    }
    const isAdmin = ADMIN_EMAILS.includes(newUser.email);
    if (isAdmin) newUser.role = UserRole.ADMIN;
    return await this.userModel.save(newUser);
  }

  async findOne(email: string) {
    const user = await this.userModel.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userModel.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found.');
    return plainToClass(UserDto, user);
  }

  async findAll(optionsUser: optionsUser) {
    const { limit = 10, page = 0 } = optionsUser;
    const skip = page * limit;
    const user = await this.userModel.createQueryBuilder('user')
      .where('user.email LIKE :keyword', { keyword: `%${optionsUser.keyword}%` })
      .skip(skip)
      .take(limit)
      .getManyAndCount()
    return user;
  }

  async deleteOne(id: string): Promise<void> {
    const user = await this.userModel.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found.');
    await this.userModel.delete(id);
  }

  async setRole(id, role: UserRole) {
    await this.userModel.update(id, { role })
    return this.userModel.findOne({
      where: {
        id
      }
    })
  }

  async update(
    id: string,
    attrs: Partial<UserDocument>
  ) {

    const user = await this.userModel.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.firstName = attrs.firstName || user.firstName;
    user.email = attrs.email || user.email;

    const updatedUser = await this.userModel.save(user);

    return updatedUser;
  }

  async adminUpdate(id: string, attrs: Partial<UserDocument>) {

    const user = await this.userModel.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.firstName = attrs.firstName || user.firstName;
    user.email = attrs.email || user.email;
    user.role = attrs.role !== undefined && attrs.role;

    const updatedUser = await this.userModel.save(user);

    return updatedUser;
  }

  // async deleteMany(): Promise<void> {
  //   await this.userModel.delete();
  // }
}
