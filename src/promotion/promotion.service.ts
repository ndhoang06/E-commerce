import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import ProductEntity from 'src/products/product.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(ProductEntity)
    private readonly productionRepository: Repository<ProductEntity>
  ) { }

  async create(createPromotionDto: CreatePromotionDto) {
    const checkPromotion = await this.promotionRepository.findOneBy({ percent: createPromotionDto.percent })
    if (checkPromotion) {
      return 'đã tồn tại'
    }
    return this.promotionRepository.save(createPromotionDto)
  }

  findAll() {
    return this.promotionRepository.find()
  }

  findOne(id: string) {
    return this.promotionRepository.findOneBy({ id })
  }

  update(id: string, updatePromotionDto: UpdatePromotionDto) {
    return this.promotionRepository.update(id, updatePromotionDto)
  }

  remove(id: string) {
    return this.promotionRepository.delete(id)
  }

  async applyPromotion(idProduct: string, idPromotion: string) {
    const promotion = await this.promotionRepository.findOneBy({ id: idPromotion })
    return this.productionRepository.createQueryBuilder()
      .update(ProductEntity)
      .set({ promotion: promotion })
      .where('id=:idProduct', { idProduct })
      .execute()
  }
}
