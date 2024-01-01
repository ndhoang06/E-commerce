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
    const user1 = '8ae6d964-71e0-4557-a58a-aabb1280cb61'
    const result = await this.buildRepository.query(`
    SELECT 
    p.id AS cpu_id, p.name AS cpu_name, p.image AS cpu_image, p.price AS cpu_price,
    p1.id AS mainboard_id, p1.name AS mainboard_name, p1.image AS mainboard_image, p1.price AS mainboard_price,
    p2.id AS ram_id, p2.name AS ram_name, p2.image AS ram_image, p2.price AS ram_price,
    p3.id AS hdd_id, p3.name AS hdd_name, p3.image AS hdd_image, p3.price AS hdd_price,
    p4.id AS ssd_id, p4.name AS ssd_name, p4.image AS ssd_image, p4.price AS ssd_price,
    p5.id AS vga_id, p5.name AS vga_name, p5.image AS vga_image, p5.price AS vga_price,
    p6.id AS psu_id, p6.name AS psu_name, p6.image AS psu_image, p6.price AS psu_price,
    p7.id AS case_id, p7.name AS case_name, p7.image AS case_image, p7.price AS case_price,
    p8.id AS monitor_id, p8.name AS monitor_name, p8.image AS monitor_image, p8.price AS monitor_price,
    p9.id AS keyboard_id, p9.name AS keyboard_name, p9.image AS keyboard_image, p9.price AS keyboard_price,
    p10.id AS mouse_id, p10.name AS mouse_name, p10.image AS mouse_image, p10.price AS mouse_price,
    p11.id AS led_id, p11.name AS led_name, p11.image AS led_image, p11.price AS led_price,
    p12.id AS radiators_id, p12.name AS radiators_name, p12.image AS radiators_image, p12.price AS radiators_price,
    u.id as userId
    FROM public.build as b 
    LEFT JOIN public."product_entity" p ON b."cpu" = p.id
    LEFT JOIN public."product_entity" p1 ON b."mainboard" = p1.id
    LEFT JOIN public."product_entity" p2 ON b."ram" = p2.id
    LEFT JOIN public."product_entity" p3 ON b."hdd" = p3.id
    LEFT JOIN public."product_entity" p4 ON b."ssd" = p4.id
    LEFT JOIN public."product_entity" p5 ON b."vga" = p5.id
    LEFT JOIN public."product_entity" p6 ON b."psu" = p6.id
    LEFT JOIN public."product_entity" p7 ON b."case" = p7.id
    LEFT JOIN public."product_entity" p8 ON b."monitor" = p8.id
    LEFT JOIN public."product_entity" p9 ON b."keyboard" = p9.id
    LEFT JOIN public."product_entity" p10 ON b."mouse" = p10.id
    LEFT JOIN public."product_entity" p11 ON b."led" = p11.id
    LEFT JOIN public."product_entity" p12 ON b."radiators" = p12.id
    JOIN public."user_entity" u ON b."userId" = u.id
    WHERE u.id = $1
`, [user1]);
    return result;
  }
/*
p.id AS cpu_id, p.name AS cpu_name, p.image AS cpu_image, p.price AS cpu_price,
    p1.id AS mainboard_id, p1.name AS mainboard_name, p1.image AS mainboard_image, p1.price AS mainboard_price
FROM public.build as b 
            JOIN public."product_entity" p ON b."cpu" = p.id
            JOIN public."product_entity" p1 ON b."mainboard" = p1.id
            JOIN public."product_entity" p2 ON b."ram" = p2.id
            JOIN public."product_entity" p3 ON b."hdd" = p3.id
            JOIN public."product_entity" p4 ON b."ssd" = p4.id
            JOIN public."product_entity" p5 ON b."vga" = p5.id
            JOIN public."product_entity" p6 ON b."psu" = p6.id
            JOIN public."product_entity" p7 ON b."case" = p7.id
            JOIN public."product_entity" p8 ON b."monitor" = p8.id
            JOIN public."product_entity" p9 ON b."keyboard" = p9.id
            JOIN public."product_entity" p10 ON b."mouse" = p10.id
            JOIN public."product_entity" p11 ON b."led" = p11.id
            JOIN public."product_entity" p12 ON b."radiators" = p12.id
            JOIN public."user_entity" u ON b."userId" = u.id
*/
  update(id: number, updateBuildDto: UpdateBuildDto) {
    return `This action updates a #${id} build`;
  }

  remove(id: number) {
    return `This action removes a #${id} build`;
  }
}
