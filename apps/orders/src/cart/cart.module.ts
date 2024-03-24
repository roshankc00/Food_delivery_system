import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {
  DatabaseModule,
  FOODS_SERVICE,
  ORDERS_SERVICE,
  OrderEntity,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '@app/common/entities/cart.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
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
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
