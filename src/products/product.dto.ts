import { IsString, IsNumber } from 'class-validator';
import { Categories } from 'src/categories/categories.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional()
  @IsString()
  brand: string;

  @ApiPropertyOptional()
  @IsString()
  category: Categories;

  @ApiPropertyOptional()
  @IsString()
  countInStock: string;
}
