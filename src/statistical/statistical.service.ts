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
  ) { }

  async statisticalOrder(query) {
    const startDate = new Date(query?.startDate);
    const endDate = new Date(query?.endDate);
    const selectedYear = query?.year || new Date().getFullYear(); // Lấy năm từ query, nếu không có thì lấy năm hiện tại
    const startOfYear = new Date(`${selectedYear}-01-01`);
    const endOfYear = new Date(`${selectedYear}-12-31`);
    
    let totalProfit = 0;

    if (isNaN(startDate.getTime()) && isNaN(endDate.getTime())) {
        const orders = await this.orderRepository.createQueryBuilder('order')
            .where('order.status = :status', { status: Status.DONE })
            .andWhere('order.createdTimestamp >= :startOfYear', { startOfYear: startOfYear.getTime() })
            .andWhere('order.createdTimestamp <= :endOfYear', { endOfYear: endOfYear.getTime() });

        const result = await orders.getMany();
        const monthlyProfit = Array.from({ length: 12 }, (_, month) => ({ month: month + 1, totalProfit: 0 }));

        result.forEach(item => {
            const timestampString: any = item.createdTimestamp;
            const timestamp = parseInt(timestampString, 10);

            if (!isNaN(timestamp) && timestamp !== null && timestamp !== undefined) {
                const date = new Date(timestamp);
                const month = date.getMonth();

                if (monthlyProfit[month]) {
                    monthlyProfit[month].totalProfit += item.totalPrice;
                } else {
                    console.error(`monthlyProfit for month ${month} is undefined.`);
                }
            } else {
                console.error(`Invalid timestamp string for item: ${JSON.stringify(item)}`);
            }
        });

        return monthlyProfit;
    } else {
        const orders = await this.orderRepository.createQueryBuilder('order')
            .where('order.status = :status', { status: Status.DONE })
            .andWhere('order.createdTimestamp >= :startDate', { startDate: startDate.getTime() })
            .andWhere('order.createdTimestamp <= :endDate', { endDate: endDate.getTime() });

        const result = await orders.getMany();

        for (const item of result) {
            totalProfit += item.totalPrice;
        }

        return { totalProfit };
    }
}

  async statisticalUsers(query) {
    const startDate = new Date(query?.startDate);
    const endDate = new Date(query?.endDate);
    const user = await this.userRepository.createQueryBuilder('user')
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        user.andWhere('user.createdTimestamp >= :startDate', { startDate: startDate.getTime() })
          .andWhere('user.createdTimestamp <= :endDate', { endDate: endDate.getTime() });
      const result = await user.getMany()
      return { count: result.length }
    }else {
      const users = await user.getMany()
      const monthlyCount = Array.from({ length: 12 }, (_, month) => ({ month: month + 1, count: 0 }));
  // Tính toán số lượng user được tạo trong mỗi tháng
  users.forEach(user => {
    const timestampString: any = user.createdTimestamp;
    const timestamp = parseInt(timestampString, 10);
    // Kiểm tra xem monthlyCount[userMonth] đã được định nghĩa chưa
    if (!isNaN(timestamp) && timestamp !== null && timestamp !== undefined) {
      const date = new Date(timestamp);
      const month = date.getMonth();
      if (monthlyCount[month]) {
        monthlyCount[month].count++;
      } else {
        console.error(`monthlyProfit for month ${month} is undefined.`);
      }
    } else {
      console.error(`Invalid timestamp string for item: ${JSON.stringify(user)}`);
    }
  });

  return monthlyCount;
    }
  }
}
