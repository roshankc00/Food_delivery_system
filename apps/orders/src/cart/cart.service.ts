import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Post,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CommonJwtAuthGuard,
  Currentuser,
  FOODS_SERVICE,
  PrismaService,
} from '@app/common';
import { IncreaseDecreaseCartDto } from './dto/increaseDecreaseCart.dto';
import { User } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(
    private readonly prismService: PrismaService,
    @Inject(FOODS_SERVICE) private readonly foodService: ClientProxy,
  ) {}

  async addToCart(
    increaseDecreaseCartDto: IncreaseDecreaseCartDto,
    @Currentuser() user: User,
  ) {
    const { foodId } = increaseDecreaseCartDto;
    let ItemExistInCart = false;
    const foodItem = await this.foodService
      .send('get_single_food', {
        foodId,
      })
      .toPromise();

    console.log(foodItem);
    if (!foodItem) {
      throw new NotFoundException();
    }

    let cartExist = await this.prismService.cart.findFirst({
      where: {
        userId: user.id,
        isDeleted: false,
      },
      include: {
        CartItem: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!cartExist) {
      cartExist = await this.prismService.cart.create({
        data: {
          userId: user.id,
        },
        include: {
          CartItem: {
            include: {
              food: true,
            },
          },
        },
      });
      return await this.prismService.cart.findFirst({
        where: {
          userId: user.id,
          isDeleted: false,
        },
        include: {
          CartItem: {
            include: {
              food: true,
            },
          },
        },
      });
    }

    cartExist?.CartItem?.map(async (data) => {
      if (data.food.id === foodId) {
        ItemExistInCart = true;
        await this.prismService.cartItem.update({
          where: {
            id: data.id,
          },
          data: {
            quantity: data.quantity + 1,
          },
        });
      }
    });

    if (!ItemExistInCart) {
      const cartItem = await this.prismService.cartItem.create({
        data: {
          quantity: 1,
          cartId: cartExist.id,
          foodId: foodId,
        },
      });
    }

    return await this.prismService.cart.findFirst({
      where: {
        userId: user.id,
        isDeleted: false,
      },
      include: {
        CartItem: {
          include: {
            food: true,
          },
        },
      },
    });
  }

  async decreateCart(
    increaseDecreaseCartDto: IncreaseDecreaseCartDto,
    @Currentuser() user: User,
  ) {
    const { foodId } = increaseDecreaseCartDto;
    let ItemExistInCart = false;
    const foodItem = await this.foodService
      .send('get_single_food', {
        foodId,
      })
      .toPromise();
    if (!foodItem) {
      throw new NotFoundException();
    }

    let cartExist = await this.prismService.cart.findFirst({
      where: {
        userId: user.id,
        isDeleted: false,
      },
      include: {
        CartItem: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!cartExist) {
      cartExist = await this.prismService.cart.create({
        data: {
          userId: user.id,
        },
        include: {
          CartItem: {
            include: {
              food: true,
            },
          },
        },
      });
    }

    cartExist?.CartItem?.map(async (data) => {
      if (data.food.id === foodId && data.quantity > 1) {
        ItemExistInCart = true;
        await this.prismService.cartItem.update({
          where: {
            id: data.id,
          },
          data: {
            quantity: data.quantity - 1,
          },
        });
      }
    });

    if (!ItemExistInCart) {
      throw new BadRequestException();
    }

    return await this.prismService.cart.findFirst({
      where: {
        userId: user.id,
        isDeleted: false,
      },
      include: {
        CartItem: {
          include: {
            food: true,
          },
        },
      },
    });
  }

  async getCartOfUser(userId: string) {
    return await this.prismService.cart.findFirst({
      where: {
        userId: userId,
        isDeleted: false,
      },
      include: {
        CartItem: {
          include: {
            food: true,
          },
        },
      },
    });
  }

  async clearCart(id: string) {
    await this.prismService.cart.delete({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
}
