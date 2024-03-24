import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FoodEntity } from '../../entities/food.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
