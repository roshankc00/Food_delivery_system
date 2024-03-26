import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {
  AUTH_SERVICE,
  FOODS_SERVICE,
  HealthModule,
  PAYMENT_SERVICE,
  PrismaService,
} from '@app/common';
import { CartModule } from './cart/cart.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartService } from './cart/cart.service';

@Module({
  imports: [
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
      {
        name: PAYMENT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3007,
        },
      },
    ]),
    HealthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, CartService, PrismaService],
})
export class OrdersModule {}
