import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '@app/common/entities/cart.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { FOODS_SERVICE } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepositary: Repository<CartEntity>,
    @Inject(FOODS_SERVICE) private readonly foodService: ClientProxy,
  ) {}
  increaseProductOfCart(foodId: string) {
    return this.foodService.send('get_single_food', {
      foodId,
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

  async remove(id: number) {
    const category = await this.cartRepositary.findOne({
      where: {
        isDeleted: false,
      },
    });

    category.isDeleted = true;
    return this.cartRepositary.save(category);
  }
}
