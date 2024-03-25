import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { IncreaseDecreaseCartDto } from './dto/increaseDecreaseCart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
