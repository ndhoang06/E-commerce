import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity, { ProductShow, Review } from './product.entity';
import UserEntity from 'src/users/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { plainToClass } from 'class-transformer';

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
    const size = req.query.size || 10;
    const page = req.query.page || 1;
    const products = await (await this.createInvoiceQueryBuilder(req))
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.reviews', 'reviews')
      .leftJoinAndSelect('products.attachments', 'attachments')
      .leftJoinAndSelect('products.promotion', 'promotion')
      .take(size)
      .skip(size * (page - 1))
      .getMany()

    if (products.length < 0) throw new NotFoundException('No products found.');
    const result = products.map(product => plainToClass(ProductShow, product));
    const count: any = products.length
    return [result, count];
  }

  private async createInvoiceQueryBuilder(req) {
    const keyword = req.query.keyword || "";
    const products = await this.productModel
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.trademark', 'trademark')
      .where('products.name LIKE :keyword', { keyword: `%${keyword}%` })
    if (req.query.priceStart && req.query.priceEnd) {
      products.andWhere('products.price BETWEEN :priceStart AND :priceEnd', { priceStart: req.query.priceStart, priceEnd: req.query.priceEnd })
    }
    if (req.query.branch) {
      products.andWhere('trademark.name=:branch', { branch: req.query.branch })
    }
    if (req.query.information) {
      products.andWhere(`products.information @> ARRAY[:...information]`, { information: [req.query.information] })
    }
    return products
  }

  async findById(id: string) {
    const product = await this.productModel.find(
      {
        where: { id: id },
        relations: {
          category: true,
          trademark: true,
          reviews: true,
          attachments: true,
          promotion: true
        }
      }
    );
    if (!product) throw new NotFoundException('No product with given ID.');

    return product;
  }

  async createMany(
    products
  ) {
    const createdProducts = await this.productModel.save(products);

    return createdProducts;
  }

  async createSample(createProducts, image: Express.Multer.File, attachment: Express.Multer.File[]) {
    if (image[0].mimetype.match('image')) {
      const url_image = await this.cloudinaryService.uploadFile(image[0])
      const product = new ProductEntity()
      product.name = createProducts.name;
      product.price = createProducts.price;
      product.category = createProducts.category;
      product.numReviews = createProducts.numReviews;
      product.countInStock = createProducts.countInStock;
      product.description = createProducts.description;
      product.image = url_image;
      product.trademark = createProducts.trademark;
      product.information = createProducts.information;

      const createdProduct = await this.productModel.save(product);
      if (attachment.length < 0) {

      } else {
        attachment.map(async (attachment) => {
          return await this.attachmentsService.create(attachment, createdProduct.id)
        })
      }
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
  ) {
    let { name, price, description, category, countInStock, trademark, urls, promotion } =
      attrs;

    const product = await this.productModel.findOneBy({ id });

    if (!product) throw new NotFoundException('No product with given ID.');

    if (image == undefined) {
      return 'Need a image main'
    }

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
      await this.cloudinaryService.deleteFile(product.image)
      const fileName = await this.cloudinaryService.uploadFile(image[0])
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = fileName;
      product.trademark = trademark;
      product.category = category;
      product.countInStock = countInStock;
      product.promotion = promotion;
      const updatedProduct = await this.productModel.save(product);
      return updatedProduct;
    } else {
      return 'Please image'
    }
  }

  async createReview(
    idProduct: string,
    user,
    body
  ) {

    const product = await this.productModel.createQueryBuilder('product')
      .where('product.id=:idProduct', { idProduct })
      .leftJoinAndSelect('product.reviews', 'review')
      .getOne()
    if (!product) throw new NotFoundException('No product with given ID.');

    const checkUser = await this.userModel.findOneBy({ id: user.id });

    const review = new Review()
    review.user = checkUser;
    review.comment = body.comment;
    review.products = product;
    review.rating = body.rating;
    await this.reviewModel.save(review)

    const newProduct = await this.productModel.createQueryBuilder('product')
      .where('product.id=:idProduct', { idProduct })
      .leftJoinAndSelect('product.reviews', 'review')
      .getOne()
    newProduct.rating =
      newProduct.reviews.reduce((acc, item) => item.rating + acc, 0) /
      newProduct.reviews.length;
    newProduct.numReviews = newProduct.reviews.length
    const result = await this.productModel.save(newProduct)
    return result
  }

  async deleteOne(id: string) {
    const product = await this.productModel.findOneBy({ id });
    if (!product) throw new NotFoundException('No product with given ID.');

    await this.productModel.delete(id);
    return await this.attachmentsService.remove(id)
  }

  async deleteMany() {
    return await this.productModel.delete({});
  }

  async applyPromotion(idProduct: string, body) {
    return this.productModel.update({ id: idProduct }, {
      promotion: body.promotion
    })
  }
}
