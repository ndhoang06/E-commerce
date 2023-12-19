import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, Status } from 'src/orders/order.entity';
import UserEntity from 'src/users/user.entity';

@Injectable()
export class StatisticalService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  async statisticalOrder(query) {
    const startDate = new Date(query?.startDate);
    const endDate = new Date(query?.endDate);
    let totalProfit = 0;
      const order = await this.orderRepository.createQueryBuilder('order')
      .where('order.status = :status',{status:Status.DONE})
      if (startDate && endDate) {
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          order.andWhere('order.createdTimestamp >= :startDate', { startDate: startDate.getTime() })
            .andWhere('order.createdTimestamp <= :endDate', { endDate: endDate.getTime() });
        } else {
          console.error('Invalid startDate or endDate format');
        }
      }
      const result = await order.getMany()
    for (const item of result) {
      totalProfit += item.totalPrice;
  }
    return {totalProfit, count: result.length}
  }

  async statisticalUsers(query){
    const startDate = new Date(query?.startDate);
    const endDate = new Date(query?.endDate);
      const user = await this.userRepository.createQueryBuilder('user')
      if (startDate && endDate) {
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          user.andWhere('user.createdTimestamp >= :startDate', { startDate: startDate.getTime() })
            .andWhere('user.createdTimestamp <= :endDate', { endDate: endDate.getTime() });
        } else {
          console.error('Invalid startDate or endDate format');
        }
      }
      const result = await user.getMany()
    return {count: result.length}
  }

}
