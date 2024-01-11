import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import UserEntity from 'src/users/user.entity';
import ProductEntity from 'src/products/product.entity';
import { PaymentService } from 'src/payment/payment.service';
import { PublicModule } from 'src/public/public.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity]),
    PublicModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentService],
})
export class OrderModule { }
