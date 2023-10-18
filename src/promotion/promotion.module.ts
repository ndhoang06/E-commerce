import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import ProductEntity from 'src/products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion, ProductEntity]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService]
})
export class PromotionModule { }
