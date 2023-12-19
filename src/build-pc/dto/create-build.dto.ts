import { ApiPropertyOptional } from "@nestjs/swagger"

export class CreateBuildDto {
    @ApiPropertyOptional()
    cpu?:string

    @ApiPropertyOptional()
    mainboard?:string

    @ApiPropertyOptional()
    ram?:string

    @ApiPropertyOptional()
    hdd?:string

    @ApiPropertyOptional()
    ssd?:string

    @ApiPropertyOptional()
    vga?:string

    @ApiPropertyOptional()
    psu?:string

    @ApiPropertyOptional()
    case?:string

    @ApiPropertyOptional()
    monitor?:string

    @ApiPropertyOptional()
    keyboard?:string

    @ApiPropertyOptional()
    mouse?:string

    @ApiPropertyOptional()
    led?:string

    @ApiPropertyOptional()
    radiators?:string

}
