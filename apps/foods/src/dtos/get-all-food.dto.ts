import { IsNumber } from 'class-validator';
import { FoodSort } from '../enums/filter-short.enum';

export class GetAllFoodDto {
  sort: FoodSort;
  searchText: string;
  maxPrice: number;
  minPrice: number;
  skip: number = 0;
  limit: number = 10;
}
