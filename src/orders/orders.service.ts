import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentResult } from 'src/interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, Status } from './order.entity';
import UserEntity from 'src/users/user.entity';
import ProductEntity from 'src/products/product.entity';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderModel: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productModel: Repository<ProductEntity>,
    private readonly paymentService: PaymentService
  ) { }

  async create(
    orderAttrs,
    userId: string
  ) {
    const {
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = orderAttrs;

    if (orderItems && orderItems.length < 1)
      throw new BadRequestException('No order items received.');

    const user = await this.userModel.findOneBy({ id: userId })

    const createdOrder = await this.orderModel.save({
      user: user,
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: Status.PENDING
    });

    return createdOrder;
  }

  async findAll(user) {
    const orders = await this.orderModel.find({
      relations: {
        user: true
      }
    });
    return orders;
  }

  async findById(id: string) {
    const order = await this.orderModel
      .createQueryBuilder('order')
      .where('order.id = :id', { id })
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .select(['user', 'orderItems', 'order.shippingDetails', 'order.paymentMethod', 'order.itemsPrice', 'order.taxPrice'])
      .getOne();
    if (!order) throw new NotFoundException('No order with given ID.');

    return order;
  }

  async updatePaid(
    req,
    id: number,
    paymentResult: PaymentResult
  ) {
    const order = await this.orderModel.findOneBy({ id });
    if (!order) throw new NotFoundException('No order with given ID.');
    order.isPaid = true;
    order.paidAt = Date();
    // order.paymentResult = paymentResult;
    await this.orderModel.save(order);
    const vnURL = await this.paymentService.payment(req, order)
    return vnURL;
  }

  async updateDelivered(id: number) {
    const order = await this.orderModel.findOneBy({ id });

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isDelivered = true;
    order.deliveredAt = Date();
    order.status = Status.DONE
    const updatedOrder = await this.orderModel.save(order);

    return updatedOrder;
  }

  async findUserOrders(userId: string) {
    const orders = await this.orderModel
      .createQueryBuilder('order')
      .where('order.user = :userId', { userId })
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.productId', 'product')
      .select(['user', 'orderItems', 'order.shippingDetails', 'order.paymentMethod', 'order.itemsPrice', 'order.taxPrice'])
      .getMany();
    return orders;
  }

  cancelOrder(id, user) {
    return this.orderModel.createQueryBuilder()
      .update(OrderEntity)
      .set({ status: Status.CANCEL })
      .where('id=:id', { id })
      .andWhere('user=:userId', { userId: user.id })
      .andWhere('status =:status', { status: Status.PENDING })
      .execute()
  }

  updateStatus(id, status: Status) {
    return this.orderModel.createQueryBuilder()
      .update(OrderEntity)
      .set({ status: status })
      .where('id=:id', { id })
      .execute()
  }
}
