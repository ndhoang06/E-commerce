import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { paymentMethod } from 'src/orders/order.schema';

export class SavePaymentMethodDto {
  @ApiProperty()
  @IsString()
  paymentMethod: paymentMethod;
}
