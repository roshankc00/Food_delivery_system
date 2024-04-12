import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @ApiProperty({
    example: 'Burger ',
    description: 'Provide the name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'very good one',
    description: 'Provide thedescription',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '232323',
    description: 'Provide the price',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: '10',
    description: 'Provide the Discount percentage',
  })
  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @ApiProperty({
    example: 'Id',
    description: 'Provide the categoryId',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
