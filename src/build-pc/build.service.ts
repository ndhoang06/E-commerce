import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildDto } from './dto/create-build.dto';
import { UpdateBuildDto } from './dto/update-build.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Build } from './entities/build.entity';
import { Repository } from 'typeorm';
import UserEntity from 'src/users/user.entity';

@Injectable()
export class BuildService {
  constructor(
    @InjectRepository(Build)
    private readonly buildRepository: Repository<Build>,
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
  ) { }

  async create(createBuildDto: CreateBuildDto, user) {
    //kiểm tra xem thử đã có chưa
    const checkExist = await this.findOne(user)
    const checkUser = await this.userModel.findOneBy({ id: user.id })
    if(!checkUser){
      throw new NotFoundException('Not found user.');
    }
      if (!checkExist) {
      const newBuild  = await this.buildRepository.create({
        ...createBuildDto,
        user: checkUser
      })
      await this.buildRepository.save(newBuild);
    } else {
      await this.buildRepository.createQueryBuilder()
        .update(Build)
        .set(createBuildDto)
        .where('user=:id', { id: user.id })
        .execute()
    }

    async function createProductQuery(repository, user, field) {
      const alias = field.toLowerCase(); // Tạo alias từ tên trường
  
      return repository.createQueryBuilder('build')
          .leftJoinAndSelect('build.user', 'user')
          .innerJoinAndSelect('product_entity', alias, `build.${field} = ${alias}.id`)
          .where('user.id = :id', { id: user.id })
          .select(`${alias}.name as Name, ${alias}.price as Price`)
          .getRawOne();
  }
  
  const fields = [
      'cpu', 'mainboard', 'ram', 'hdd', 'ssd',
      'vga', 'psu', 'case', 'monitor', 'keyboard',
      'mouse', 'led', 'radiators'
  ];
  
  const queries = await Promise.all(fields.map(field => createProductQuery(this.buildRepository, user, field)));
  
  const result = fields.reduce((acc, field, index) => {
      acc[field] = queries[index] || null;
      return acc;
  }, {});
  return result
  }

  async findOne(user) {
    return await this.buildRepository.createQueryBuilder('build')
      .leftJoinAndSelect('build.user', 'user') // Join with the user relationship
      .where('user.id = :id', { id: user.id }) // Use the correct column name for the user's ID
      .getOne();
  }

  update(id: number, updateBuildDto: UpdateBuildDto) {
    return `This action updates a #${id} build`;
  }

  remove(id: number) {
    return `This action removes a #${id} build`;
  }
}
