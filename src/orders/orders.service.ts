import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
import { PublicService } from 'src/public/public.service';
import { ContentEmail } from 'src/public/public.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderModel: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productModel: Repository<ProductEntity>,
    private readonly paymentService: PaymentService,
    private readonly publicService: PublicService
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
    for (const item of orderItems) {
      const product = await this.productModel.findOne({
        where: {
          id: item.productId
        }
      })
      if (product.countInStock < item.qty) {
        throw new BadRequestException('The product is no longer in stock.');
      }
    }
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
    await this.paymentService.handleQuantiy(createdOrder.id)
    const contentEmail = new ContentEmail();
    contentEmail.subject = `Bạn vừa đặt hàng thành công với #${createdOrder.id}`;
    contentEmail.content = `
        Bạn vừa đặt hàng thành công với #${createdOrder.id} <br>
        `;
    contentEmail.to = [createdOrder.user.email]
    await this.publicService.sendEmail(contentEmail)
    return createdOrder;
  }

  async findAll(status) {
    const orders = await this.orderModel.find({
      where: {
        status: status,
      },
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
    if (order.status === Status.SHIPPING ||
      order.status === Status.DONE ||
      order.status === Status.CANCEL
    ) {
      throw new HttpException(`Cannot change status`, HttpStatus.BAD_REQUEST)
    } else {
      order.isPaid = true;
      order.paidAt = Date();
      order.status = Status.PAYMENT;
      // order.paymentResult = paymentResult;
      return await this.orderModel.save(order);
    }
  }

  async updateDelivered(id: number) {
    const order = await this.orderModel.findOneBy({ id });

    if (!order) throw new NotFoundException('No order with given ID.');
    if (order.status === Status.CANCEL) {
      throw new HttpException('Cannot change status', HttpStatus.BAD_GATEWAY)
    }
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

  async cancelOrder(id, user) {
    const checkOrder = await this.orderModel.findOne({
      where: { id }
    })
    if (checkOrder.status === Status.DONE) {
      throw new HttpException('Cannot change status', HttpStatus.BAD_REQUEST)
    }
    return this.orderModel.createQueryBuilder()
      .update(OrderEntity)
      .set({ status: Status.CANCEL })
      .where('id=:id', { id })
      .andWhere('user=:userId', { userId: user.id })
      .andWhere('status =:status', { status: Status.PENDING })
      .execute()
  }

  async updateStatus(id, status: Status) {
    const checkOrder = await this.orderModel.findOne({
      where: { id }
    })
    if (status === Status.PENDING) {
      throw new HttpException("cannot change status", HttpStatus.BAD_REQUEST)
    }
    if (status === Status.PROCESSING) {
      if (checkOrder.status === Status.PENDING) {
        return this.orderModel.createQueryBuilder()
          .update(OrderEntity)
          .set({ status: status })
          .where('id=:id', { id })
          .execute()
      } else {
        throw new HttpException("cannot change status", HttpStatus.BAD_REQUEST)
      }
    } else if (status === Status.SHIPPING) {
      if (checkOrder.status === Status.PENDING || checkOrder.status === Status.PROCESSING) {
        return this.orderModel.createQueryBuilder()
          .update(OrderEntity)
          .set({ status: status })
          .where('id=:id', { id })
          .execute()
      } else {
        throw new HttpException("cannot change status", HttpStatus.BAD_REQUEST)
      }
    } else if (status === Status.CANCEL) {
      if (checkOrder.status === Status.DONE) {
        throw new HttpException("cannot change status", HttpStatus.BAD_REQUEST)
      } else {
        for (const item of checkOrder.orderItems) {
          const product = await this.productModel.findOne({
            where: {
              id: item.productId
            }
          })
          await this.productModel.query(`
          UPDATE product_entity
          SET "countInStock" = ${product.countInStock} + ${item.qty}
          WHERE id = $1
        `, [item.productId])
        }
        return this.orderModel.createQueryBuilder()
          .update(OrderEntity)
          .set({ status: status })
          .where('id=:id', { id })
          .execute()
      }
    }
    return this.orderModel.createQueryBuilder()
      .update(OrderEntity)
      .set({ status: status })
      .where('id=:id', { id })
      .execute()
  }

  removeOrder(id, req) {
    return this.orderModel.delete(id)
  }
}
