import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { CategoriesModule } from './categories/categories.module';
import {
  AUTH_SERVICE,
  CategoryEntity,
  DatabaseModule,
  FoodEntity,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories/categories.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CategoriesModule,
    DatabaseModule,
    TypeOrmModule.forFeature([FoodEntity, CategoryEntity]),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService, CategoriesService, DatabaseModule],
})
export class FoodsModule {}
