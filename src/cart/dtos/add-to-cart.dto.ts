import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductDocument } from 'src/products/product.schema';

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
