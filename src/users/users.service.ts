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

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(newUser) {
    const checkUser = await this.findOne(newUser.email)
    if(checkUser){
      return checkUser;
    }
    const isAdmin = ADMIN_EMAILS.includes(newUser.email);
    if (isAdmin) newUser.role = UserRole.ADMIN;
    return await this.userModel.create(newUser);
  }

  async findOne(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();

    return users;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    await user.remove();
  }

  async update(
    id: string,
    attrs: Partial<UserDocument>
  ): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.firstName = attrs.firstName || user.firstName;
    user.email = attrs.email || user.email;

    const updatedUser = await user.save();

    return updatedUser;
  }

  async adminUpdate(id: string, attrs: Partial<UserDocument>) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.firstName = attrs.firstName || user.firstName;
    user.email = attrs.email || user.email;
    user.role = attrs.role !== undefined && attrs.role;

    const updatedUser = await user.save();

    return updatedUser;
  }

  async deleteMany(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
