import { IsString } from 'class-validator';
import { paymentMethod } from 'src/orders/order.schema';

export class SavePaymentMethodDto {
  @IsString()
  paymentMethod: paymentMethod;
}
