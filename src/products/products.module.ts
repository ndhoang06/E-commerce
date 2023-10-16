import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity, { Review } from './product.entity';
import UserEntity from 'src/users/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
@Module({
  imports: [
    AttachmentsModule,
    TypeOrmModule.forFeature([ProductEntity, Review, UserEntity]),
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
