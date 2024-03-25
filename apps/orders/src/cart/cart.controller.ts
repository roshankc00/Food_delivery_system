import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IncreaseDecreaseCartDto } from './dto/increaseDecreaseCart.dto';
import { CartService } from './cart.service';
import { CommonJwtAuthGuard, Currentuser } from '@app/common';
import { User } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('addToCart')
  @UseGuards(CommonJwtAuthGuard)
  addToCart(
    @Body() increaseDecreaseCartDto: IncreaseDecreaseCartDto,
    @Currentuser() user: User,
  ) {
    return this.cartService.addToCart(increaseDecreaseCartDto, user);
  }

  @Post('addToCart')
  @UseGuards(CommonJwtAuthGuard)
  decreateCart(
    @Body() increaseDecreaseCartDto: IncreaseDecreaseCartDto,
    @Currentuser() user: User,
  ) {
    return this.cartService.decreateCart(increaseDecreaseCartDto, user);
  }

  @Delete(':id')
  @UseGuards(CommonJwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.cartService.clearCart(id);
  }
}
