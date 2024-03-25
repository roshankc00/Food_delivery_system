import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {
  AUTH_SERVICE,
  CartEntity,
  CartItemEntity,
  DatabaseModule,
  FOODS_SERVICE,
  OrderEntity,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartService } from './cart/cart.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, OrderEntity]),

    CartModule,
    ClientsModule.register([
      {
        name: FOODS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003,
        },
      },
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
  controllers: [OrdersController],
  providers: [OrdersService, CartService],
})
export class OrdersModule {}
