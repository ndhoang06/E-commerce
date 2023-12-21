import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Categories } from 'src/categories/categories.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';
import TrademarkEntity from 'src/trademark/trademark.entity';
import { Expose } from 'class-transformer';
import { TypeProduct } from './product.entity';

export class optionsProduct {
  @ApiPropertyOptional()
  keyword?: string;
  @ApiPropertyOptional()
  size?: number;
  @ApiPropertyOptional()
  limit?: number;
  @ApiPropertyOptional()
  page?: number;
  @ApiPropertyOptional()
  priceStart?: number;
  @ApiPropertyOptional()
  priceEnd?: number;
  @ApiPropertyOptional()
  category?: string;
  @ApiPropertyOptional()
  branch?: string;
  @ApiPropertyOptional()
  type?: TypeProduct;
  @ApiPropertyOptional()
  information?: object;
}

export class ProductDto {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  price: string;

  @ApiPropertyOptional()
  // @IsArray()
  description: string[];

  @ApiPropertyOptional()
  information: object;

  // @ApiPropertyOptional()
  // @IsString()
  // brand: string;

  @ApiPropertyOptional()
  @IsString()
  category: Categories;

  @ApiPropertyOptional()
  @IsString()
  countInStock: string;

  @ApiPropertyOptional()
  @IsString()
  trademark: TrademarkEntity;

  @ApiPropertyOptional()
  urls: string[];

  @ApiPropertyOptional()
  @IsOptional()
  promotion: string;
}
