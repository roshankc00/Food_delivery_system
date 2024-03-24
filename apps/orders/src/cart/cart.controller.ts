import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { IncreaseDecreaseCartDto } from './dto/increaseDecreaseCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('increaseCartQuantity')
  increaseProductToCart(
    @Body() increaseDecreaseCartDto: IncreaseDecreaseCartDto,
  ) {
    return this.cartService.increaseProductOfCart(increaseDecreaseCartDto);
  }
  @Post('decreaseCartQuantity')
  decreaseCartQuantity(
    @Body() increaseDecreaseCartDto: IncreaseDecreaseCartDto,
  ) {
    return this.cartService.increaseProductOfCart(increaseDecreaseCartDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
