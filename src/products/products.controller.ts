import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/user.schema';
import { ProductDto } from './product.dto';
import { ReviewDto } from './review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  getProducts(
    @Query('keyword') keyword: string,
    @Query('pageId') pageId: number,
    @Query('pageSize') pageSize: number
  ) {
    return this.productsService.findMany(keyword, pageId, pageSize);
  }

  @Get('topRated')
  getTopRatedProducts() {
    return this.productsService.findTopRated();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@Body() createProducts: ProductDto, @UploadedFile() file: Express.Multer.File) {
    const product = await this.productsService.createSample(createProducts, file, path);
    return product
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDto,
    @UploadedFile() file: Express.Multer.File) {
    return this.productsService.update(id, product, file, path);
  }

  @UseGuards(AuthGuard)
  @Put(':id/review')
  createReview(
    @Param('id') id: string,
    @Body() body: ReviewDto,
    @Req() req
  ) {
    const user = req.user
    return this.productsService.createReview(id, user, body);
  }
}
