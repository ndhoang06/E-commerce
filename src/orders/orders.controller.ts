import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/user.schema';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: any, @Req() req) {
    const user = req.user
    return this.ordersService.create(body, user._id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getOrders(@Req() req) {
    const user = req.user
    return this.ordersService.findAll(user);
  }

  @UseGuards(AuthGuard)
  @Get('myorders')
  async getUserOrders(@Req() req) {
    const user = req.user
    return this.ordersService.findUserOrders(user._id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  //đã thanh toán
  @UseGuards(AuthGuard)
  @Put(':id/pay')
  async updateOrderPayment(
    @Param('id') id: string,
    @Body() { paymentResult }: any
  ) {
    return this.ordersService.updatePaid(id, paymentResult);
  }

  //xác nhận giao hàng
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id/deliver')
  async updateOrderDelivery(@Param('id') id: string) {
    return this.ordersService.updateDelivered(id);
  }
}
