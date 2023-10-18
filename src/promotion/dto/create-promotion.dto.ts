import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePromotionDto {
    @ApiProperty()
    @IsNumber()
    percent: number;

    @ApiProperty()
    @IsString()
    description: string;
}

