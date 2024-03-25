import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CommonJwtAuthGuard, Currentuser, UserDto } from '@app/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(CommonJwtAuthGuard)
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Currentuser() user: User,
  ) {
    return this.ordersService.createOrder(createOrderDto, user);
  }
}
