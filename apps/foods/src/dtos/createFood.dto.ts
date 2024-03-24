import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;
  
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
