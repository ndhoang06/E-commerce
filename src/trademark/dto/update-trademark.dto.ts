import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UpdateTrademarkDto {
    @ApiPropertyOptional()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsString()
    image: string
}
