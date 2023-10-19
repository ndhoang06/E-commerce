import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get('vnpay_return/:id')
  async vnpay_return(@Req() req, @Res() res, @Param('id') id: any) {
    const result = await this.paymentService.vnpay_return(req)
    if (result.code == '00') {
      await this.paymentService.handleQuantiy(id)
    }
    res.json(result)
    return result
  }

  @Post()
  async payment(@Req() req, @Res() res) {
    const result = await this.paymentService.payment(req, req.body.orderId)
    res.redirect(result)
  }

}
