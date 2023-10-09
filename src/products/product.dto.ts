import { IsString, IsNumber } from 'class-validator';
import { Categories } from 'src/categories/categories.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ProductDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  brand: string;

  @ApiPropertyOptional()
  category: Categories;

  @ApiPropertyOptional()
  countInStock: number;
}
