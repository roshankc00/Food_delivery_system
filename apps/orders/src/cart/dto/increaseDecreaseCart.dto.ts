import { IsNotEmpty, IsString } from 'class-validator';

export class IncreaseDecreaseCartDto {
  @IsString()
  @IsNotEmpty()
  foodId: string;
  @IsString()
  @IsNotEmpty()
  cartId: string;
}
