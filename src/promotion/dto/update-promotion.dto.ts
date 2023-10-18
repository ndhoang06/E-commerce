import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdatePromotionDto {

    @ApiPropertyOptional()
    percent: number;

    @ApiPropertyOptional()
    description: string

}
