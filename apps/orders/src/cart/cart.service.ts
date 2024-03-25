import {
  BadRequestException,
  Inject,
  Injectable,
  Post,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommonJwtAuthGuard, Currentuser, FOODS_SERVICE } from '@app/common';
import { IncreaseDecreaseCartDto } from './dto/increaseDecreaseCart.dto';
import { User } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(
    @Inject(FOODS_SERVICE) private readonly foodService: ClientProxy,
  ) {}

  @UseGuards(CommonJwtAuthGuard)
  increaseCartQuantity(
    increaseDecreaseCartDto: IncreaseDecreaseCartDto,
    @Currentuser() user: User,
  ) {}
}
