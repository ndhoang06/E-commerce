import {
  Body,
  Controller,
  Delete,
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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OrderDTO } from './order.dto';

@Controller('orders')
@ApiTags('Order')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: OrderDTO, @Req() req) {
    const user = req.user
    return this.ordersService.create(body, user.id);
  }

  // @UseGuards(AuthGuard)
  @Get()
  async getOrders(@Req() req) {
    const status = req.query.status
    return this.ordersService.findAll(status);
  }

  @UseGuards(AuthGuard)
  @Get('myorders')
  async getUserOrders(@Req() req) {
    const user = req.user
    return this.ordersService.findUserOrders(user.id);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Put('cancel/:id')
  async cancelOrder(@Param('id') id: string, @Req() req) {
    const user = req.user
    return this.ordersService.cancelOrder(id, user);
  }

  //đã thanh toán
  @UseGuards(AuthGuard)
  @Put(':id/pay')
  async updateOrderPayment(
    @Req() req,
    @Param('id') id: number,
    @Body() { paymentResult }: any
  ) {
    return this.ordersService.updatePaid(req, id, paymentResult);
  }

  //xác nhận giao hàng
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id/deliver')
  async updateOrderDelivery(@Param('id') id: number) {
    return this.ordersService.updateDelivered(id);
  }

  @UseGuards(AuthGuard, 
    // RolesGuard
    )
  // @Roles(UserRole.ADMIN)
  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Req() req) {
    const user = req.user
    return this.ordersService.updateStatus(id, req.body.status, user)
  }

  @Delete(':id')
  removeOrder(@Param('id') id:number, @Req() req){
    return this.ordersService.removeOrder(id,req)
  }
}
