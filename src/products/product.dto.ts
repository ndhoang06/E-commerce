import { IsString, IsNumber } from 'class-validator';
import { Categories } from 'src/categories/categories.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';
import TrademarkEntity from 'src/trademark/trademark.entity';

export class optionsProduct {
  @ApiPropertyOptional()
  keyword?: string;
  @ApiPropertyOptional()
  size?: number;
  @ApiPropertyOptional()
  page?: number;
}

export class ProductDto {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  price: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

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
}
