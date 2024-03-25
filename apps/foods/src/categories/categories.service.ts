import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@app/common';
@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const data = this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
    return data;
  }

  findAll() {
    return this.prismaService.category.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prismaService.category.findUnique({
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
    const category = await this.prismaService.category.update({
      where: {
        id,
        isDeleted: false,
      },
      data: updateCategoryDto,
    });
    return category;
  }

  async remove(id: string) {
    const category = await this.prismaService.category.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }
}
