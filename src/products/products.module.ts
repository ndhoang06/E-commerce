import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity, { Review } from './product.entity';
import UserEntity from 'src/users/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AttachmentsModule } from 'src/attachments/attachments.module';
import CategoryEntity from 'src/categories/categories.entity';
import TrademarkEntity from 'src/trademark/trademark.entity';
import { Promotion } from 'src/promotion/entities/promotion.entity';
@Module({
  imports: [
    AttachmentsModule,
    TypeOrmModule.forFeature([ProductEntity, Review, UserEntity,CategoryEntity,Promotion,TrademarkEntity]),
    // MongooseModule.forFeature([
    //   {
    //     name: Product.name,
    //     schema: ProductSchema,
    //   },
    // ]),
  ],
  providers: [ProductsService, CloudinaryService],
  controllers: [ProductsController],
})
export class ProductsModule { }
