import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTrademarkDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiPropertyOptional()
    // @IsString()
    image: string
}
