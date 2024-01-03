import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildDto } from './dto/create-build.dto';
import { UpdateBuildDto } from './dto/update-build.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Build } from './entities/build.entity';
import { Repository } from 'typeorm';
import UserEntity from 'src/users/user.entity';
import { TypeCart } from 'src/cart/dtos/add-to-cart.dto';

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
    if (!checkUser) {
      throw new NotFoundException('Not found user.');
    }
    if (!checkExist) {
      const newBuild = await this.buildRepository.create({
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
    const user1 = user.id
    const result = await this.buildRepository.query(`
    SELECT
    JSONB_BUILD_OBJECT(
      'cpu', JSONB_BUILD_OBJECT('id', p.id, 'name', p.name, 'image', p.image, 'price', p.price, 'information', p.information, 'qty', b.qtycpu),
      'mainboard', JSONB_BUILD_OBJECT('id', p1.id, 'name', p1.name, 'image', p1.image, 'price', p1.price, 'information', p1.information, 'qty', b.qtymainboard ),
      'ram', JSONB_BUILD_OBJECT('id', p2.id, 'name', p2.name, 'image', p2.image, 'price', p2.price, 'information', p2.information, 'qty', b.qtyram ),
      'hdd', JSONB_BUILD_OBJECT('id', p3.id, 'name', p3.name, 'image', p3.image, 'price', p3.price, 'information', p3.information, 'qty', b.qtyhdd ),
      'ssd', JSONB_BUILD_OBJECT('id', p4.id, 'name', p4.name, 'image', p4.image, 'price', p4.price, 'information', p4.information, 'qty', b.qtyssd ),
      'vga', JSONB_BUILD_OBJECT('id', p5.id, 'name', p5.name, 'image', p5.image, 'price', p5.price, 'information', p5.information, 'qty', b.qtyvga ),
      'psu', JSONB_BUILD_OBJECT('id', p6.id, 'name', p6.name, 'image', p6.image, 'price', p6.price, 'information', p6.information, 'qty', b.qtypsu ),
      'case', JSONB_BUILD_OBJECT('id', p7.id, 'name', p7.name, 'image', p7.image, 'price', p7.price, 'information', p7.information, 'qty', b.qtycase ),
      'monitor', JSONB_BUILD_OBJECT('id', p8.id, 'name', p8.name, 'image', p8.image, 'price', p8.price, 'information', p8.information, 'qty', b.qtymonitor ),
      'keyboard', JSONB_BUILD_OBJECT('id', p9.id, 'name', p9.name, 'image', p9.image, 'price', p9.price, 'information', p9.information, 'qty', b.qtykeyboard ),
      'mouse', JSONB_BUILD_OBJECT('id', p10.id, 'name', p10.name, 'image', p10.image, 'price', p10.price, 'information', p10.information, 'qty', b.qtymouse ),
      'led', JSONB_BUILD_OBJECT('id', p11.id, 'name', p11.name, 'image', p11.image, 'price', p11.price, 'information', p11.information, 'qty', b.qtyled ),
      'radiators', JSONB_BUILD_OBJECT('id', p12.id, 'name', p12.name, 'image', p12.image, 'price', p12.price, 'information', p12.information, 'qty', b.qtyradiators )
    ) AS products,
    TO_JSONB(u) AS user
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
    return result[0];
  }
  async update(user,updateBuildDto: UpdateBuildDto) {
    if(updateBuildDto.type === TypeCart.ADD){
      return await this.buildRepository.query(
        `UPDATE build
          SET qty${updateBuildDto.parts} = qty${updateBuildDto.parts} + 1
          FROM public."user_entity" u
          WHERE build."userId" = u.id AND u.id = $1;
        `,[user.id]
      )
    }else {
      return await this.buildRepository.query(
        `UPDATE build
          SET qty${updateBuildDto.parts} = qty${updateBuildDto.parts} - 1
          FROM public."user_entity" u
          WHERE build."userId" = u.id AND u.id = $1;
        `,[user.id]
      )
    }
  }

  async remove(keyword: string,user) {
      const result = await this.buildRepository.query(
        `UPDATE build
        SET ${keyword} = NULL
        FROM public."user_entity" u
        WHERE build."userId" = u.id AND u.id = $1;
        `,[user.id]
      )
      return result
  }
}
