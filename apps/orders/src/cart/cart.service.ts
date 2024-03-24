import { Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '@app/common/entities/cart.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CartItemEntity, FOODS_SERVICE } from '@app/common';
import { map } from 'rxjs';
import { IncreaseDecreaseCartDto } from './dto/increaseDecreaseCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepositary: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepositary: Repository<CartItemEntity>,
    @Inject(FOODS_SERVICE) private readonly foodService: ClientProxy,
  ) {}

  createCart() {}
  increaseProductOfCart(increaseDecreaseCartDto: IncreaseDecreaseCartDto) {
    const product = this.foodService.send('get_single_food', {
      foodId: increaseDecreaseCartDto.foodId,
    });
    const cart = this.cartRepositary.findOne({
      where: {
        id: increaseDecreaseCartDto.cartId,
      },
    });
  }
  decreaseProductOfCart() {}

  findAll() {
    return this.cartRepositary.find({
      where: {
        isDeleted: false,
      },
    });
  }

  findOne(id: number) {
    return this.cartRepositary.findOne({
      where: {
        isDeleted: false,
      },
    });
  }

  async remove(id: string) {
    const category = await this.cartRepositary.findOne({
      where: {
        isDeleted: false,
      },
    });

    category.isDeleted = true;
    return this.cartRepositary.save(category);
  }
}
