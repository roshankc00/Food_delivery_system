import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './createFood.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
