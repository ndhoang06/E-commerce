import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginatedProducts } from 'src/interfaces';
import { Product, ProductDocument } from './product.schema';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) { }

  async findTopRated(): Promise<ProductDocument[]> {
    const products = await this.productModel
      .find({})
      .sort({ rating: -1 })
      .limit(3);

    if (!products.length) throw new NotFoundException('No products found.');

    return products;
  }

  async findByCategory(categoryId) {
    const products = await this.productModel.find({
      $expr: { $eq: ['$category', { $toObjectId: categoryId }] }
    })
    return products;
  }

  async findMany(query): Promise<PaginatedProducts> {
    const keyword = query.keyword || "";
    const size = query.size || 10;
    const page = query.page || 1;

    const rgex = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    const count = await this.productModel.countDocuments({ ...rgex });
    const products = await this.productModel
      .find({ ...rgex })
      .limit(size)
      .skip(size * (page - 1));

    if (!products.length) throw new NotFoundException('No products found.');
    return { products, page, pages: Math.ceil(count / size) };
  }

  async findById(id: string): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product ID.');

    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException('No product with given ID.');

    return product;
  }

  async createMany(
    products: Partial<ProductDocument>[]
  ): Promise<ProductDocument[]> {
    const createdProducts = await this.productModel.insertMany(products);

    return createdProducts;
  }

  async createSample(createProducts, file: Express.Multer.File, path) {
    if (file.mimetype.match('image')) {
      const createdProduct = await this.productModel.create(createProducts);
      const fileName = `products/product${createdProduct._id}/${Date.now()}-${file.originalname}`;
      if (
        !fs.existsSync(`./src/filesUpload/products/product${createdProduct._id}`)
      ) {
        fs.mkdirSync(`./src/filesUpload/products/product${createdProduct._id}`, {
          recursive: true,
        });
      }
      const filePath = path.join('./src/filesUpload', fileName);
      fs.writeFileSync(filePath, file.buffer);
      await this.productModel.updateOne({ _id: createdProduct._id }, {
        image: fileName
      })
      return { createdProduct };
    } else {
      throw new BadRequestException('Invalid file type');
    }
  }

  async update(
    id: string,
    attrs,
    file: Express.Multer.File,
    path
  ) {
    let { name, price, description, image, brand, category, countInStock, url } =
      attrs;
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product ID.');

    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException('No product with given ID.');

    fs.readdir(`./src/filesUpload/products/product${id}`, (err, files1) => {
      if (err) {
        console.log(err);
        return;
      }
      fs.unlinkSync(`./src/filesUpload/products/product${id}/${url}`);
    });
    if (file.mimetype.match('image')) {
      if (!fs.existsSync(`./src/filesUpload/products/product${id}`)) {
        throw new HttpException(
          'Not found product',
          HttpStatus.BAD_REQUEST,
        );
      }
      var fileName = `products/product${id}/${Date.now()}-${file.originalname}`;
      const filePath = path.join('./src/filesUpload', fileName);
      fs.writeFileSync(filePath, file.buffer);
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = fileName;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    return updatedProduct;
  }

  async createReview(
    id: string,
    user,
    body
  ): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product ID.');

    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException('No product with given ID.');

    const alreadyReviewed = product.reviews.find(
      r => r.user === user._id
    );

    if (alreadyReviewed)
      throw new BadRequestException('Product already reviewed!');

    const review = {
      name: user.firstName,
      rating: body.rating,
      comment: body.comment,
      user: user._id,
    };

    product.reviews.push(review);

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.numReviews = product.reviews.length;

    const updatedProduct = await product.save();

    return updatedProduct;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product ID.');
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('No product with given ID.');

    fs.rmdirSync(`./src/filesUpload/products/product${id}`, { recursive: true });
    await product.remove();
  }

  async deleteMany(): Promise<void> {
    await this.productModel.deleteMany({});
  }
}
