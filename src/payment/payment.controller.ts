import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Headers, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import * as crypto from 'crypto';
import * as querystring from 'qs';
import * as moment from 'moment';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get('create_payment_url')
  create(@Req() req, @Headers() header, @Res() res) {
    return this.paymentService.create()
  }
  @Post()
  async payment(@Req() req, @Res() res) {
    const result = await this.paymentService.payment(req)
    res.redirect(result)
  }

}
