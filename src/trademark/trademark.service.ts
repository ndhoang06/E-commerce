import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrademarkDto } from './dto/create-trademark.dto';
import { UpdateTrademarkDto } from './dto/update-trademark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import TrademarkEntity from './trademark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrademarkService {
  constructor(
    @InjectRepository(TrademarkEntity)
    private readonly trademarkModel: Repository<TrademarkEntity>
  ) { }

  async create(createTrademarkDto: CreateTrademarkDto) {
    const checkTrademark = await this.trademarkModel.findOneBy({ name: createTrademarkDto.name });
    if (!checkTrademark) {
      return await this.trademarkModel.save(createTrademarkDto);
    }
    throw new HttpException(`Danh mục ${checkTrademark.name} đã tồn tại`, HttpStatus.BAD_REQUEST)
  }

  async findAll() {
    return await this.trademarkModel.find();
  }

  async findOne(id: string) {
    return await this.trademarkModel.find({
      where: {
        id: id,
      },
      relations: {
        products: true
      }
    });
  }

  async update(id: string, updateTrademarkDto: UpdateTrademarkDto) {
    const checkTrademark = await this.trademarkModel.findOneBy({ id })
    if (!checkTrademark) throw new HttpException("Not found trademark", HttpStatus.NOT_FOUND)
    return await this.trademarkModel.update(id, {
      name: updateTrademarkDto.name,
      image: updateTrademarkDto.image
    })
  }

  async remove(id: string) {
    const checkTrademark = await this.trademarkModel.findOneBy({ id })
    if (!checkTrademark) throw new HttpException("Not found trademark", HttpStatus.NOT_FOUND)
    return this.trademarkModel.delete(id)
  }
}
