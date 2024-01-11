import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { PublicService } from 'src/public/public.service';
import { ContentEmail } from 'src/public/public.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly publicService: PublicService,) { }

  @Get('vnpay_return/:id')
  async vnpay_return(@Req() req, @Res() res, @Param('id') id: any) {
    const result = await this.paymentService.vnpay_return(req)
    if (result.code == '00') {
      await this.paymentService.changeStatusPayment(id)
      res.redirect('http://localhost:8080/payment-success');
    } else {
      res.redirect('http://localhost:8080/payment-error');
    }
  }

  @Post()
  async payment(@Req() req, @Res() res) {
    try {
      const result = await this.paymentService.payment(req, req.body.orderId)
      res.json(result);
    } catch (error) {
      console.log(error)
    }
  }

  @Post('momo')
  async paymentMomo(@Req() req, @Res() res) {
    try {
      const result = await this.paymentService.paymentMomo(req, req.body.orderId)
      res.json(result);
    } catch (error) {
      console.log(error)
    }
  }
}
