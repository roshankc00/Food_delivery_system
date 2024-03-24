import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositary: Repository<CategoryEntity>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepositary.create({
      name: createCategoryDto.name,
    });
  }

  findAll() {
    return this.categoryRepositary.find({});
  }

  async findOne(id: string) {
    const category = await this.categoryRepositary.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepositary.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    category.name = updateCategoryDto.name;

    return this.categoryRepositary.save(category);
  }

  async remove(id: string) {
    const category = await this.categoryRepositary.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }
    category.isDeleted = true;
    return this.categoryRepositary.save(category);
  }
}
