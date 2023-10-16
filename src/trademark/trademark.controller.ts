import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrademarkService } from './trademark.service';
import { CreateTrademarkDto } from './dto/create-trademark.dto';
import { UpdateTrademarkDto } from './dto/update-trademark.dto';

@Controller('trademark')
export class TrademarkController {
  constructor(private readonly trademarkService: TrademarkService) { }

  @Post()
  create(@Body() createTrademarkDto: CreateTrademarkDto) {
    return this.trademarkService.create(createTrademarkDto);
  }

  @Get()
  findAll() {
    return this.trademarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trademarkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrademarkDto: UpdateTrademarkDto) {
    return this.trademarkService.update(id, updateTrademarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trademarkService.remove(id);
  }
}
