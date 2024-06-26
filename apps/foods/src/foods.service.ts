import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dtos/createFood.dto';
import { UpdateFoodDto } from './dtos/update-food.dto';
import { GetAllFoodDto } from './dtos/get-all-food.dto';
import { PrismaService } from '@app/common';

@Injectable()
export class FoodsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFoodDto: CreateFoodDto) {
    const { categoryId, description, discount, name, price } = createFoodDto;
    const food = this.prismaService.food.create({
      data: {
        name,
        description,
        price,
        categoryId,
        discount,
        priceAfterDiscount: price - (discount / 100) * price,
      },
    });
    return food;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const foodExist = await this.prismaService.food.findFirst({
      where: {
        id,
      },
    });
    if (!foodExist) {
      throw new NotFoundException();
    }

    const food = await this.prismaService.food.update({
      where: {
        id,
        isDeleted: false,
      },
      data: updateFoodDto,
    });
    return food;
  }

  async findOne(id: string) {
    const food = await this.prismaService.food.findUnique({
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

  findAll(filterData: GetAllFoodDto) {
    // return this.filterFoods(filterData);
    return 'haha';
  }
  // parseQuery(query: any): any {
  //   const parsedQuery: any = {};

  //   for (const key in query) {
  //     if (Object.prototype.hasOwnProperty.call(query, key)) {
  //       switch (key) {
  //         case 'searchText':
  //           parsedQuery.searchText = JSON.parse(query[key]);
  //           break;
  //         case 'maxPrice':
  //           parsedQuery.maxPrice = parseFloat(query[key]);
  //           break;
  //         case 'sort':
  //           parsedQuery.sort =
  //             FoodSort[query[key].replace(/"/g, '') as keyof typeof FoodSort];
  //           break;
  //         default:
  //           parsedQuery[key] = query[key];
  //           break;
  //       }
  //     }
  //   }

  //   return parsedQuery;
  // }
  // async filterFoods(filterDataInput: GetAllFoodDto) {
  //   const filterData = this.parseQuery(filterDataInput);
  //   const foodFilterQuery = this.foodRepositary.createQueryBuilder('food');
  //   if (filterData?.minPrice) {
  //     foodFilterQuery.andWhere('food.priceAfterDiscount > :minPrice', {
  //       minPrice: filterData.minPrice,
  //     });
  //   }
  //   if (filterData?.maxPrice) {
  //     foodFilterQuery.andWhere('food.priceAfterDiscount < :maxPrice', {
  //       maxPrice: filterData.maxPrice,
  //     });
  //   }
  //   if (filterData?.sort) {
  //     switch (filterData?.sort) {
  //       case FoodSort.NAME_ASC:
  //         foodFilterQuery.orderBy('name', 'ASC');
  //         break;
  //       case FoodSort.NAME_DESC:
  //         foodFilterQuery.orderBy('name', 'DESC');
  //         break;
  //       case FoodSort.PRICE_ASC:
  //         foodFilterQuery.orderBy('priceAfterDiscount', 'ASC');
  //         break;
  //       case FoodSort.PRICE_DESC:
  //         foodFilterQuery.orderBy('priceAfterDiscount', 'DESC');
  //         break;
  //       case FoodSort.CREATEDAT_ASC:
  //         foodFilterQuery.orderBy('createdAt', 'ASC');
  //         break;
  //       case FoodSort.CREATEDAT_DESC:
  //         foodFilterQuery.orderBy('createdAt', 'DESC');
  //         break;
  //     }
  //   }
  //   if (filterData?.searchText) {
  //     const searchTerm = `%${filterData.searchText}%`;
  //     foodFilterQuery.andWhere(
  //       '(food.name LIKE :searchTerm OR food.description LIKE :searchTerm)',
  //       { searchTerm },
  //     );
  //   }

  //   return await foodFilterQuery
  //     .skip(filterData?.skip | 0)
  //     .limit(filterData?.limit | 10)
  //     .leftJoinAndSelect('food.category', 'category')
  //     .getMany();
  // }

  async remove(id: string) {
    const food = await this.prismaService.food.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!food) {
      throw new NotFoundException();
    }
    return food;
  }
}
