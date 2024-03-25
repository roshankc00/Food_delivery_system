import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsString()
  @IsNotEmpty()
  email: string;
}
