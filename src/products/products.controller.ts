import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  Query,
  UploadedFiles,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/user.schema';
import { ProductDto, optionsProduct } from './product.dto';
import { ReviewDto } from './review.dto';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './product.entity';
@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService,
    @InjectRepository(Review)
    private readonly reviewModel: Repository<Review>,) { }


  @Get('test-csv')
  async testCSV() {
    

    return { message: 'CSV file exported successfully' };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(AuthGuard)
  @Post('recommender')
  async recommender(@Req() req) {
    const model = await this.reviewModel.query(
      `
      SELECT
        r.id,
        r.rating ,
        r."comment" ,
        u.id as user,
        pe.id as product,
        ce.id as category
      FROM
        public.review as r
      LEFT JOIN
        public.user_entity u ON r."userId" = u.id 
      LEFT JOIN
        public.product_entity pe ON r."productsId" = pe.id
      LEFT JOIN
        public.category_entity ce ON pe."categoryId" = ce.id;
      `
    )

    const header = [
      { id: 'id', title: 'id' },
      { id: 'user', title: 'userId' },
      { id: 'rating', title: 'rating' },
      { id: 'comment', title: 'comment' },
      { id: 'product', title: 'productId' },
      { id: 'category', title: 'category' }
    ];

    const outputPath = 'F:\\DATN\\pythonProject\\import.csv';
    await this.productsService.exportToCsv(model, outputPath, header);

    const pythonUrl = "http://127.0.0.1:5000/hello";
    const data = {
      idproduct: req.body.idproduct,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    
    const response = await fetch(pythonUrl, requestOptions);
    const dataFromPython = await response.json()
    return await this.productsService.recommend1(dataFromPython)
    // const user = req.user.id;
    // return await this.productsService.recommender(dataFromPython, user)
  }


  @Get(':id/review')
  async showRating(@Param('id') id: string) {
    return await this.productsService.showRating(id)
  }

  @Get('getFilterProducts')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProducts(
    @Query() queryProducts?: optionsProduct
  ) {
    const [data, totalCount] = await this.productsService.findMany(queryProducts)
    const totalPages = Math.ceil(totalCount / (queryProducts.size ?? 10));
    return {
      data,
      totalPages,
      totalCount,
    }
  }

  @Get('getAllProducts')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllProducts() {
    return this.productsService.getAllProducts()
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
  @Delete('delete')
  deleteProducts(@Body('id') id: []) {
    return this.productsService.deleteMany(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteOne(id);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'attachments', maxCount: 5 },
  ]))
  async createProduct(@Body() createProducts: ProductDto,
    @UploadedFiles() files: { image?: Express.Multer.File, attachments?: Express.Multer.File[] }
  ) {
    const product = await this.productsService.createSample(createProducts, files.image, files.attachments);

    return product
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('apply-promotion/:id')
  applyPromotion(
    @Param('id') id: string,
    @Body() body
  ) {
    return this.productsService.applyPromotion(id, body)
  }

}
