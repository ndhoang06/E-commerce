import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaymentResult } from 'src/interfaces';
import { Order, OrderDocument } from './order.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import UserEntity from 'src/users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderModel: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
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
    });

    return createdOrder;
  }

  async findAll(user) {
    const orders = await this.orderModel.find();
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
    // const order = await this.orderModel.aggregate([
    //   {
    //     $match: {
    //       $expr: { $eq: ['$_id', { $toObjectId: id }] }
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'user',
    //       foreignField: '_id',
    //       as: 'user'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'products',
    //       localField: 'orderItems.productId',
    //       foreignField: '_id',
    //       as: 'products',
    //     }
    //   },
    //   {
    //     $project: {
    //       user: '$user',
    //       orderItems: {
    //         $map: {
    //           input: '$products',
    //           as: "productsObj",
    //           in: "$$productsObj",
    //         }
    //       },
    //       shippingDetails: 1,
    //       paymentMethod: 1,
    //       itemsPrice: 1,
    //       taxPrice: 1,
    //     }
    //   }
    // ]);

    if (!order) throw new NotFoundException('No order with given ID.');

    return order;
  }

  async updatePaid(
    id: number,
    paymentResult: PaymentResult
  ) {
    const order = await this.orderModel.findOneBy({ id });

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isPaid = true;
    order.paidAt = Date();
    // order.paymentResult = paymentResult;

    const updatedOrder = await this.orderModel.save(order);

    return updatedOrder;
  }

  async updateDelivered(id: number) {
    const order = await this.orderModel.findOneBy({ id });

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isDelivered = true;
    order.deliveredAt = Date();

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
    // const orders = await this.orderModel.aggregate([
    //   {
    //     $match: {
    //       $expr: { $eq: ['$user', { $toObjectId: userId }] }
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'user',
    //       foreignField: '_id',
    //       as: 'user'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'products',
    //       localField: 'orderItems.productId',
    //       foreignField: '_id',
    //       as: 'products',
    //     }
    //   },
    //   {
    //     $project: {
    //       user: '$user',
    //       // orderItems: '$orderItems',
    //       orderItems: {
    //         $map: {
    //           input: '$products',
    //           as: "productsObj",
    //           in: "$$productsObj",
    //         }
    //       },
    //       shippingDetails: 1,
    //       paymentMethod: 1,
    //       itemsPrice: 1,
    //       taxPrice: 1,
    //     }
    //   }
    // ]);
    return orders;
  }
}
