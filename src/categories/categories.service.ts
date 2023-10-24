import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryEntity from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesModel: Repository<CategoryEntity>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const checkCategories = await this.categoriesModel.findOneBy({ name: createCategoryDto.name });
    if (!checkCategories) {
      return await this.categoriesModel.save(createCategoryDto);
    }
    throw new HttpException(`Danh mục ${checkCategories.name} đã tồn tại`, HttpStatus.BAD_REQUEST)
  }

  async findAll() {
    return await this.categoriesModel.find();
  }

  async findOne(id: string) {
    return await this.categoriesModel.find({
      where: {
        id: id,
      },
      relations: {
        products: true
      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const checkCategories = await this.categoriesModel.findOneBy({ id: id });
    if (!checkCategories) {
      throw new HttpException(`Danh mục ${updateCategoryDto.name} không tồn tại`, HttpStatus.NOT_FOUND)
    } else {
      return await this.categoriesModel.update(id, {
        name: updateCategoryDto.name
      })
    }
  }

  async remove(id: string) {
    const checkCategories = await this.categoriesModel.findOneBy({ id: id });
    if (!checkCategories) {
      throw new HttpException(`Danh mục không tồn tại`, HttpStatus.NOT_FOUND)
    } else {
      return await this.categoriesModel.delete(id)
    }
  }
}
