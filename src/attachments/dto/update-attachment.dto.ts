import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAttachmentDto } from './create-attachment.dto';

export class UpdateAttachmentDto {

    @ApiPropertyOptional()
    product?: string;

    @ApiPropertyOptional()
    urls: string[];

}
