import { Module } from '@nestjs/common';
import { TrademarkService } from './trademark.service';
import { TrademarkController } from './trademark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrademarkEntity from './trademark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrademarkEntity]),
  ],
  controllers: [TrademarkController],
  providers: [TrademarkService]
})
export class TrademarkModule { }
