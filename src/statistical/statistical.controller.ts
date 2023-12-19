import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StatisticalService } from './statistical.service';
import { CreateStatisticalDto } from './dto/create-statistical.dto';
import { UpdateStatisticalDto } from './dto/update-statistical.dto';

@Controller('statistical')
export class StatisticalController {
  constructor(private readonly statisticalService: StatisticalService) {}

  @Get('orders')
  statisticalOrders(@Req() req) {
    return this.statisticalService.statisticalOrder(req.query);
  }

  @Get('users')
  statisticalUsers(@Req() req) {
    return this.statisticalService.statisticalUsers(req.query);
  }

}
