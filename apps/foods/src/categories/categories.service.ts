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
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const data = this.categoryRepository.create({
      name: createCategoryDto.name,
    });
    console.log(data);

    return this.categoryRepository.save(data);
  }

  findAll() {
    return this.categoryRepository.find({
      where: {
        isDeleted: false,
        isPublished: true,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        isDeleted: false,
        isPublished: true,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        isDeleted: false,
        isPublished: true,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    category.name = updateCategoryDto.name;

    return this.categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        isDeleted: false,
        isPublished: true,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }
    category.isDeleted = true;
    return this.categoryRepository.save(category);
  }
}
