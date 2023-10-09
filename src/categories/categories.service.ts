import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from './categories.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const checkCategories = await this.categoriesModel.findOne({name:createCategoryDto.name});
    if(!checkCategories){
      return await this.categoriesModel.create(createCategoryDto);
    }
    throw new HttpException(`Danh mục ${checkCategories.name} đã tồn tại`,HttpStatus.BAD_REQUEST)
  }

  async findAll() {
    return await this.categoriesModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const checkCategories = await this.categoriesModel.findOne({_id:id});
    if(!checkCategories){
      throw new HttpException(`Danh mục ${updateCategoryDto.name} không tồn tại`,HttpStatus.NOT_FOUND)
    }else {
      return await this.categoriesModel.updateOne({id:id},{
        name:updateCategoryDto.name
      })
    }
  }

  async remove(id: number) {
    const checkCategories = await this.categoriesModel.findOne({_id:id});
    if(!checkCategories){
      throw new HttpException(`Danh mục không tồn tại`,HttpStatus.NOT_FOUND)
    }else {
      return await this.categoriesModel.deleteOne({id:id})
    }
  }
}
