import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewDto {
  @ApiProperty()
  // @Min(1)
  // @Max(5)
  rating: number;

  @ApiPropertyOptional()
  // @IsString()
  comment: string;
}
