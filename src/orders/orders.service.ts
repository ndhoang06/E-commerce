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

  async findAll() {
    const orders = await this.orderModel.find({
      relations: {
        user: true,
      }
    });
    if (orders.length < 1) {
      return 'No orders found'
    } else {
      const result = await Promise.all(orders.map(async (item) => {
        const productId = await Promise.all(item.orderItems.map(async ordersItem => {
          const product = await this.productModel.findOne({ where: { id: ordersItem.productId } })
          return {
            qty: ordersItem.qty,
            productId: product
          }
        }))
        return {
          id: item.id,
          orderItems: productId,
          shippingDetails: item.shippingDetails,
          paymentMethod: item.paymentMethod,
          taxPrice: item.taxPrice,
          shippingPrice: item.shippingPrice,
          itemsPrice: item.itemsPrice,
          totalPrice: item.totalPrice,
          isPaid: item.isPaid,
          paidAt: item.paidAt,
          isDelivered: item.isDelivered,
          deliveredAt: item.deliveredAt,
          status: item.status,
          createdTimestamp: item.createdTimestamp,
          user: item.user
        }
      }))
      return result
    }
  }

  async findById(id: string) {
    const order = await this.orderModel
      .createQueryBuilder('order')
      .where('order.id = :id', { id })
      .getOne();
    if (!order) throw new NotFoundException('No order with given ID.');


    const productId = await Promise.all(order.orderItems.map(async ordersItem => {
      const product = await this.productModel.findOne({
        where: {
          id: ordersItem.productId
        }
      })
      return {
        qty: ordersItem.qty,
        productId: product
      }
    }))
    return {
      id: order.id,
      orderItems: productId,
      shippingDetails: order.shippingDetails,
      paymentMethod: order.paymentMethod,
      taxPrice: order.taxPrice,
      shippingPrice: order.shippingPrice,
      itemsPrice: order.itemsPrice,
      totalPrice: order.totalPrice,
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      isDelivered: order.isDelivered,
      deliveredAt: order.deliveredAt,
      status: order.status,
      createdTimestamp: order.createdTimestamp,
      user: order.user
    }
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
    order.status = Status.PAYMENT;
    // order.paymentResult = paymentResult;
    return await this.orderModel.save(order);
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
      .getMany();
    const result = await Promise.all(orders.map(async (item) => {
      const productId = await Promise.all(item.orderItems.map(async ordersItem => {
        const product = await this.productModel.findOne({
          where: {
            id: ordersItem.productId
          }
        })
        return {
          qty: ordersItem.qty,
          productId: product
        }
      }))

      return {
        id: item.id,
        orderItems: productId,
        shippingDetails: item.shippingDetails,
        paymentMethod: item.paymentMethod,
        taxPrice: item.taxPrice,
        shippingPrice: item.shippingPrice,
        itemsPrice: item.itemsPrice,
        totalPrice: item.totalPrice,
        isPaid: item.isPaid,
        paidAt: item.paidAt,
        isDelivered: item.isDelivered,
        deliveredAt: item.deliveredAt,
        status: item.status,
        createdTimestamp: item.createdTimestamp,
        user: item.user
      }
    }))
    return result
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

  removeOrder(id,req){
    return this.orderModel.delete(id)
  }
}
