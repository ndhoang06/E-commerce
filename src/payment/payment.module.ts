import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/order.entity';
import ProductEntity from 'src/products/product.entity';
import { PublicModule } from 'src/public/public.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ProductEntity]),
    PublicModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
