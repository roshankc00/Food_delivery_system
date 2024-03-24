import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {
  CartItemEntity,
  DatabaseModule,
  FOODS_SERVICE,
  ORDERS_SERVICE,
  OrderEntity,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { CartEntity } from '@app/common/entities/cart.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartService } from './cart/cart.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([OrderEntity, CartEntity, CartItemEntity]),
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
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, CartService],
})
export class OrdersModule {}
