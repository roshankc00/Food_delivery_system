import { IsNumber } from 'class-validator';
import { FoodSort } from '../enums/filter-short.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllFoodDto {
  sort: FoodSort;
  @ApiProperty({
    example: 'Bur',
    description: 'Provide the foodId',
  })
  searchText: string;
  @ApiProperty({
    example: '232',
    description: 'Provide the maxPrice',
  })
  maxPrice: number;
  @ApiProperty({
    example: '232',
    description: 'Provide the minPrice',
  })
  minPrice: number;
  @ApiProperty({
    example: '2',
    description: 'Provide the skip',
  })
  skip: number = 0;
  @ApiProperty({
    example: '232',
    description: 'Provide the limit',
  })
  limit: number = 10;
}
