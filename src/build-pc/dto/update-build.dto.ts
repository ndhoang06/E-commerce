import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBuildDto } from './create-build.dto';
import { TypeCart } from 'src/cart/dtos/add-to-cart.dto';

export class UpdateBuildDto {
    @ApiPropertyOptional()
    parts?: string

    @ApiPropertyOptional()
    type?: TypeCart
}
