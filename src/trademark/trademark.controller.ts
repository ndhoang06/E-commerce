import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrademarkService } from './trademark.service';
import { CreateTrademarkDto } from './dto/create-trademark.dto';
import { UpdateTrademarkDto } from './dto/update-trademark.dto';
import { UserRole } from 'src/users/user.schema';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('trademark')
@ApiTags('Trademark')
export class TrademarkController {
  constructor(private readonly trademarkService: TrademarkService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrademarkDto: UpdateTrademarkDto) {
    return this.trademarkService.update(id, updateTrademarkDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trademarkService.remove(id);
  }
}
