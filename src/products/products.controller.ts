import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/user.schema';
import { ProductDto, optionsProduct } from './product.dto';
import { ReviewDto } from './review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  async getProducts(
    @Req() req,
    @Query() queryProducts?: optionsProduct
  ) {
    const [data, totalCount] = await this.productsService.findMany(req, queryProducts)
    const totalPages = Math.ceil(totalCount / (req.query.size ?? 10));
    return {
      data,
      totalPages: totalPages,
      totalCount,
    }
  }

  @Get('topRated')
  getTopRatedProducts() {
    return this.productsService.findTopRated();
  }

  @Get('category/:id')
  async productsCategory(@Param('id') id: string) {
    return this.productsService.findByCategory(id);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 },
  ]))
  async createProduct(@Body() createProducts: ProductDto,
    @UploadedFiles() files: { image?: Express.Multer.File, attachments?: Express.Multer.File[] }
  ) {
    const product = await this.productsService.createSample(createProducts, files.image, path, files.attachments);
    return product
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 },
  ]))
  updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDto,
    @UploadedFiles() files: { image?: Express.Multer.File, attachments?: Express.Multer.File[] }
  ) {
    return this.productsService.update(id, product, files.image, files.attachments);
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
