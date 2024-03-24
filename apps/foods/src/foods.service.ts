import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dtos/createFood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from './entities/food.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories/categories.service';
import { UpdateFoodDto } from './dtos/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepositary: Repository<FoodEntity>,
    private readonly categoryService: CategoriesService,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    const { categoryId, description, discount, name, price } = createFoodDto;
    const category = await this.categoryService.findOne(categoryId);
    const food = this.foodRepositary.create({
      category,
      description,
      name,
      price,
      discount,
      priceAfterDiscount: price - (discount / 100) * price,
    });
    return this.foodRepositary.save(food);
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepositary.findOne({
      where: {
        id,
        isDeleted: false,
        isPublished: true,
      },
    });
    if (!food) {
      throw new NotFoundException();
    }
    Object.assign(food, updateFoodDto);
    if (updateFoodDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateFoodDto.categoryId,
      );
      food.category = category;
    }
    return this.foodRepositary.save(food);
  }

  async findOne(id: string) {
    const food = await this.foodRepositary.findOne({
      where: {
        id,
        isDeleted: false,
        isPublished: true,
      },
    });
    if (!food) {
      throw new NotFoundException();
    }
    return food;
  }

  findAll() {
    return this.foodRepositary.find({
      where: {
        isDeleted: false,
        isPublished: true,
      },
    });
  }

  async remove(id: string) {
    const food = await this.foodRepositary.findOne({
      where: {
        id,
        isDeleted: false,
        isPublished: true,
      },
    });

    if (!food) {
      throw new NotFoundException();
    }
    food.isDeleted = true;
    return this.foodRepositary.save(food);
  }
}
