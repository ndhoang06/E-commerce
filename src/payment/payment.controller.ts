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

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');


    const ipAddr = header['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress

    var tmnCode = 'W84M8S6B'
    var secretKey = 'NHYXQOEESNHWAQDVZVGIWWFMJPGOPXMX'
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
    console.log('vnpUrl', vnpUrl)
    var returnUrl = 'https://www.google.com/'

    var orderId = new Date()

    var amount = req.body.amount;
    var bankCode = req.body.bankCode;


    var orderInfo = 'Nội dung thanh toán';
    var orderType = 'billpayment';
    var locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }

    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = 10000 * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl);
  }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  @Post()
  payment(@Req() req) {
    return this.paymentService.payment(req)
  }

}
