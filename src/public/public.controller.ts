import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PublicService } from './public.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Public')
@Controller('')
export class PublicController {
  constructor(private readonly publicService: PublicService) { }

  @Get('get-attachments/products/product:id/:filename')
  async getAttachments(@Param() filename, @Res() res) {
    res.sendFile(filename.filename, {
      root: `src/filesUpload/products/product${filename.id}`,
    });
  }
}
