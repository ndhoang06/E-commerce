import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachmentsEntity } from './entities/attachment.entity';
import ProductEntity from 'src/products/product.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(AttachmentsEntity)
    private readonly attachmentRepository: Repository<AttachmentsEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {
  }

  async create(file: Express.Multer.File, id: string) {
    const url = await this.cloudinaryService.uploadFile(file)
    const checkProduct = await this.productRepository.findOneBy({ id })
    const attachment = new AttachmentsEntity()
    attachment.url = url;
    attachment.products = checkProduct
    return await this.attachmentRepository.save(attachment)
  }

  findAll() {
    return `This action returns all attachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  async update(id: string, url: string[]) {
    let updateData = [''];
    if (typeof url == 'string') {
      updateData.push(url);
    } else if (url == undefined) {
      updateData = updateData;
    } else {
      updateData = url;
    }

    const product = await this.attachmentRepository.createQueryBuilder('product')
      .where('product.products =:id', { id })
      .select('product.url')
      .getMany()

    const different = product.filter(item => {
      return !updateData.includes(item.url)
    })

    different.map(async item => {
      await this.cloudinaryService.deleteFile(item.url)
    })

    await this.attachmentRepository.createQueryBuilder()
      .delete()
      .where('products =:id', { id })
      .andWhere('url NOT IN (:...updateData)', { updateData })
      .execute();


  }

  async remove(id: string) {
    return await this.attachmentRepository.createQueryBuilder()
      .delete()
      .where('products=:id', { id })
      .execute()
  }
}
