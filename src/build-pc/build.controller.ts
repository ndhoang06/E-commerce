import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BuildService } from './build.service';
import { CreateBuildDto } from './dto/create-build.dto';
import { UpdateBuildDto } from './dto/update-build.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBuildDto: CreateBuildDto, @Req() req) {
    const user = req.user
    return this.buildService.create(createBuildDto,user);
  }

  @UseGuards(AuthGuard)
  @Get('')
  findOne(@Req() req) {
    const user = req.user
    return this.buildService.findOne(user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Req() req, @Body() updateBuildDto: UpdateBuildDto) {
    const user = req.user
    return this.buildService.update(user, updateBuildDto);
  }

  @Delete(':keyword')
  @UseGuards(AuthGuard)
  remove(@Param('keyword') keyword: string,@Req() req) {
    const user = req.user
    return this.buildService.remove(keyword,user);
  }
}
