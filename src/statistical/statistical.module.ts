import { Module } from '@nestjs/common';
import { StatisticalService } from './statistical.service';
import { StatisticalController } from './statistical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/order.entity';
import UserEntity from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity,UserEntity]),
  ],
  controllers: [StatisticalController],
  providers: [StatisticalService]
})
export class StatisticalModule {}
