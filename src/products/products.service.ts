import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDocument } from './product.schema';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity, { Review } from './product.entity';
import UserEntity from 'src/users/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AttachmentsService } from 'src/attachments/attachments.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(ProductEntity)
    private readonly productModel: Repository<ProductEntity>,
    @InjectRepository(Review)
    private readonly reviewModel: Repository<Review>,
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
  ) { }

  async findTopRated() {
    const products = await this.productModel
      .createQueryBuilder()
      .orderBy("rating", "DESC")
      .take(3)
      .getMany();

    if (!products.length) throw new NotFoundException('No products found.');

    return products;
  }

  async findByCategory(categoryId) {
    const products = await this.productModel.createQueryBuilder('product')
      .where('product.category = :categoryId', { categoryId: categoryId })
      .getMany();
    return products;
  }

  async findMany(req, queryOptions) {
    console.log(queryOptions)
    const keyword = req.query.keyword || "";
    const size = req.query.size || 10;
    const page = req.query.page || 1;
    const products = await this.productModel
      .createQueryBuilder('products')
      .where('products.name LIKE :keyword', { keyword: `%${keyword}%` })
      .take(size)
      .skip(size * (page - 1))
      .getManyAndCount()

    if (products.length < 1) throw new NotFoundException('No products found.');
    return products
  }

  async findById(id: string) {
    const product = await this.productModel.find(
      {
        where: { id },
        relations: {
          category: true,
          trademark: true,
          reviews: true
        }
      }
    );

    if (!product) throw new NotFoundException('No product with given ID.');

    return product;
  }

  async createMany(
    products: Partial<ProductDocument>[]
  ) {
    const createdProducts = await this.productModel.save(products);

    return createdProducts;
  }

  async createSample(createProducts, image: Express.Multer.File, path, attachment: Express.Multer.File[]) {
    if (image[0].mimetype.match('image')) {
      const url_image = await this.cloudinaryService.uploadFile(image[0])
      console.log(typeof url_image)
      const product = new ProductEntity()
      product.name = createProducts.name;
      product.price = createProducts.price;
      product.category = createProducts.category;
      product.numReviews = createProducts.numReviews;
      product.countInStock = createProducts.countInStock;
      product.description = createProducts.description;
      product.image = url_image;
      product.trademark = createProducts.trademark;

      const createdProduct = await this.productModel.save(product);
      attachment.map(async (attachment) => {
        return await this.attachmentsService.create(attachment, createdProduct.id)
      })
      // const fileName = `products/product${createdProduct.id}/${Date.now()}-${file.originalname}`;
      // if (
      //   !fs.existsSync(`./src/filesUpload/products/product${createdProduct.id}`)
      // ) {
      //   fs.mkdirSync(`./src/filesUpload/products/product${createdProduct.id}`, {
      //     recursive: true,
      //   });
      // }
      // const filePath = path.join('./src/filesUpload', fileName);
      // fs.writeFileSync(filePath, file.buffer);
      // await this.productModel.createQueryBuilder()
      //   .update(ProductEntity)
      //   .set({ image: fileName })
      //   .where('id=:id', { id: createdProduct.id })
      //   .execute()
      return { createdProduct };
    } else {
      throw new BadRequestException('Invalid file type');
    }
  }

  async update(
    id: string,
    attrs,
    image: Express.Multer.File,
    attachment: Express.Multer.File[],
    path
  ) {
    let { name, price, description, category, countInStock, trademark, urls } =
      attrs;

    const product = await this.productModel.findOneBy({ id });

    if (!product) throw new NotFoundException('No product with given ID.');

    // fs.readdir(`./src/filesUpload/products/product${id}`, (err, files1) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   fs.unlinkSync(`./src/filesUpload/products/product${id}/${url}`);
    // });
    console.log(attachment)
    if (image[0].mimetype.match('image')) {
      if (attachment == undefined || attachment.length < 1) {

      } else {
        Promise.all(attachment.map(async attachments => {
          if (attachments.mimetype.match('image')) {
            return await this.attachmentsService.create(attachments, id)
          } else {
            return 'Please image'
          }
        }))
      }
      await this.attachmentsService.update(id, urls)
      const fileName = await this.cloudinaryService.uploadFile(image[0])
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = fileName;
      product.trademark = trademark;
      product.category = category;
      product.countInStock = countInStock;
      const updatedProduct = await this.productModel.save(product);
      return updatedProduct;
    } else {
      return 'Please image'
    }
  }

  async createReview(
    id: string,
    user,
    body
  ) {

    const product = await this.productModel.findOneBy({ id });

    if (!product) throw new NotFoundException('No product with given ID.');

    const checkUser = await this.userModel.findOneBy({ id: user.id });

    const review = new Review()
    review.user = checkUser;
    review.comment = body.comment;
    review.products = product;
    review.rating = body.rating;
  }

  async deleteOne(id: string): Promise<void> {
    const product = await this.productModel.findOneBy({ id });
    if (!product) throw new NotFoundException('No product with given ID.');

    await this.productModel.delete(id);
    await this.attachmentsService.remove(id)
  }

  async deleteMany(): Promise<void> {
    await this.productModel.delete({});
  }
}
