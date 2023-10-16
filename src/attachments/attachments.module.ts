import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsEntity } from './entities/attachment.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import ProductEntity from 'src/products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttachmentsEntity, ProductEntity]),
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, CloudinaryService],
  exports: [AttachmentsService]
})
export class AttachmentsModule { }
