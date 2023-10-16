import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './categories.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryEntity from './categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    // MongooseModule.forFeature([
    //   {
    //     name: Categories.name,
    //     schema: CategoriesSchema,
    //   },
    // ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule { }
