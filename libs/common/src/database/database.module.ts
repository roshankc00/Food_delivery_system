import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/entities/user.entity';
import { CategoryEntity } from '@app/common/entities/category.entity';
import { FoodEntity } from '@app/common/entities/food.entity';
import { OrderEntity } from '../entities';
import { CartEntity } from '../entities/cart.entity';
import { CartItemEntity } from '../entities/CartItem.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestjsauth',
      password: 'nestjsauth',
      database: 'nestjsauth',
      entities: [
        UserEntity,
        CategoryEntity,
        FoodEntity,
        CartEntity,
        OrderEntity,
        CartItemEntity,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      FoodEntity,
      CategoryEntity,
      OrderEntity,
    ]),
  ],
  exports: [],
})
export class DatabaseModule {}
