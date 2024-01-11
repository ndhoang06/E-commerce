import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductDocument } from 'src/products/product.schema';
export enum TypeCart {
  ADD = 'add',
  SUB = 'sub',
}
export class AddToCartDto {
  @ApiPropertyOptional()
  @IsOptional()
  product?: ProductDocument;

  qty: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productId?: string;
}

export class UpdateCartDto {

  @ApiPropertyOptional()
  type:TypeCart

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional()
  qty: number
}
