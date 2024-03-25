import {
  FOODS_SERVICE,
  PAYMENT_SERVICE,
  PrismaService,
  UserDto,
} from '@app/common';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CartService } from './cart/cart.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '@prisma/client';
import { map } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cartService: CartService,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, user: UserDto) {
    try {
      const { address } = createOrderDto;
      const cart = await this.cartService.getCartOfUser(user.id);

      if (cart.CartItem.length <= 0) {
        throw new BadRequestException();
      }

      const totalPrice = cart?.CartItem?.reduce(
        (total, item) => total + item.quantity * item.food.priceAfterDiscount,
        0,
      );

      this.paymentService
        .send('create_charge', {
          amount: totalPrice,
          email: user.email,
        })
        .pipe(
          map((res) => {
            console.log(res);
            return this.prismaService.order.create({
              data: {
                paymentStatus: true,
                userId: user.id,
                address,
              },
            });
          }),
        );
    } catch (error) {
      console.log(error);
    }
  }
  findAll() {
    return this.prismaService.order.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.order.findUnique({
      where: {
        id,
      },
    });
  }
  async remove(id: string) {
    const order = await this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return order;
  }
}
