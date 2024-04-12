import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Nayamill',
    description: 'Provide the name',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
