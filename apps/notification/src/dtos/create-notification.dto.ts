import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotification {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  subject: string;
  @IsString()
  @IsNotEmpty()
  html: string;
}
