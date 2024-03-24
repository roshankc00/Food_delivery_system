import { IsNotEmpty, IsString } from 'class-validator';

export class GetSingleProductService {
  @IsString()
  @IsNotEmpty()
  foodId: string;
}
