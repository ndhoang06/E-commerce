import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity, { ProductShow, Review, TypeProduct } from './product.entity';
import UserEntity from 'src/users/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { plainToClass } from 'class-transformer';
import { optionsProduct } from './product.dto';

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

  async recommender(dataFromPython,user) {
    return new Promise(async (resolve, reject) => {
      try {
        const recommendedProducts = [];
        const a = dataFromPython.forEach(item => {
          if (user === item.userId) {
            const uuidArray = item.recommended_products.split(" ");
            recommendedProducts.push(...uuidArray);
          }
        });
        const products = await this.productModel.findByIds(recommendedProducts)
        resolve(products);
      } catch (error) {
        reject(error);
      }
    });
    
  }

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

  async getAllProducts() {
    const products = await this.productModel.createQueryBuilder('products')
      .leftJoinAndSelect('products.trademark', 'trademark')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.reviews', 'reviews')
      .leftJoinAndSelect('products.attachments', 'attachments')
      .leftJoinAndSelect('products.promotion', 'promotion')
      .orderBy('products.rating', 'DESC')
      .getMany()
    const result = products.map(product => plainToClass(ProductShow, product));
    return result;
  }

  async findMany(queryOptions: optionsProduct) {
    const { limit = 10, page = 0 } = queryOptions;
    const skip = page * limit;
    const products = await (await this.createProductQueryBuilder(queryOptions))
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.reviews', 'reviews')
      .leftJoinAndSelect('products.attachments', 'attachments')
      .leftJoinAndSelect('products.promotion', 'promotion')
      .skip(skip)
      .take(limit)
      .orderBy('products.rating', 'DESC')
      .addOrderBy('products.create_at', 'DESC')
      .getMany()

    if (products.length < 0) throw new NotFoundException('No products found.');
    const result = products.map(product => plainToClass(ProductShow, product));
    const count: any = products.length
    return [result, count];
  }

  private async createProductQueryBuilder(queryOptions) {
    const keyword = queryOptions.keyword || "";
    const products = await this.productModel
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.trademark', 'trademark')
      .where('products.name LIKE :keyword', { keyword: `%${keyword}%` })
    if (queryOptions.category) {
      products.andWhere('products.category=:category', { category: queryOptions.category })
    }
    if (queryOptions.priceStart && queryOptions.priceEnd) {
      products.andWhere('products.price BETWEEN :priceStart AND :priceEnd', { priceStart: queryOptions.priceStart, priceEnd: queryOptions.priceEnd })
    }
    if (queryOptions.branch) {
      products.andWhere('trademark.name=:branch', { branch: queryOptions.branch })
    }
    if (queryOptions.type) {
      products.andWhere('products.type=:type', { type: queryOptions.type })
    }
    if (queryOptions.information) {
      const query = queryOptions.information
      const qr = JSON.parse(query)
      Object.entries(qr).forEach(([key, value]) => {
        products.andWhere(`products.information ->>:key ILIKE :value`, { key, value: `%${value}%` })
      })
    }
    return products
  }

  async findById(id: string) {
    const product = await this.productModel.findOne(
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

  async createMany(products) {
    const createdProducts = await this.productModel.save(products);
    return createdProducts;
  }

  async createSample(createProducts, image: Express.Multer.File, attachment: Express.Multer.File[]) {
    const checkName = await this.productModel.findOneBy({ name: createProducts.name })
    if (checkName) {
      throw new HttpException('This products is already', HttpStatus.BAD_REQUEST)
    }
    if (image[0].mimetype.match('image')) {
      const url_image = await this.cloudinaryService.uploadFile(image[0])
      const product = new ProductEntity()
      const information = JSON.parse(createProducts.information)
      product.name = createProducts.name;
      product.price = createProducts.price;
      product.category = createProducts.category;
      product.numReviews = createProducts.numReviews;
      product.countInStock = createProducts.countInStock;
      product.description = createProducts.description;
      product.image = url_image;
      product.trademark = createProducts.trademark;
      product.information = information;

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

  async deleteMany(idProduct) {
    return await Promise.all(
      idProduct.map(async id => {
        const product = await this.productModel.findOneBy({ id });
        if (!product) throw new NotFoundException('No product with given ID.');
        await this.productModel.delete(id);
        return await this.attachmentsService.remove(id)
      })
    )
  }

  async deleteOne(id: string) {
    const product = await this.productModel.findOneBy({ id });
    if (!product) throw new NotFoundException('No product with given ID.');


    await this.attachmentsService.remove(id)
    return await this.productModel.delete(id);
  }

  async applyPromotion(idProduct: string, body) {
    return this.productModel.update({ id: idProduct }, {
      promotion: body.promotion,
      type: TypeProduct.KHUYENMAI
    })
  }
  // async testJsonb() {
  //   return this.productModel.createQueryBuilder()

  //     // .update(ProductEntity)
  //     // .set({ information: () => `information || '${JSON.stringify({ address: "test" })}'` })
  //     // .where('id =:id', { id: 'e006891f-2a1c-41ff-8d1f-b5ef22359bfa' })
  //     // .execute()


  //     .where('id =:id', { id: 'e006891f-2a1c-41ff-8d1f-b5ef22359bfa' })
  //     // .select("information #>> '{test1,test2}'", 'product_name')
  //     // .select("information -> 'test1'", 'product_name')


  //     .getRawMany()
  // }
}
