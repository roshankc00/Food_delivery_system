import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSingleProductService {
  @ApiProperty({
    example: 'Id',
    description: 'Provide the foodId',
  })
  @IsString()
  @IsNotEmpty()
  foodId: string;
}
