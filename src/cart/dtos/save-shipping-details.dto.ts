import { IsNumber, IsString } from 'class-validator';

export class SaveShippingDetailsDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;

  @IsNumber()
  phone: number;
}
