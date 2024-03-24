import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'apps/auth/src/entities/auth.entity';
import { CategoryEntity } from 'apps/foods/src/categories/entities/category.entity';
import { FoodEntity } from 'apps/foods/src/entities/food.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestjsauth',
      password: 'nestjsauth',
      database: 'nestjsauth',
      entities: [UserEntity, CategoryEntity, FoodEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, CategoryEntity, FoodEntity]),
  ],
  exports: [],
})
export class DatabaseModule {}
