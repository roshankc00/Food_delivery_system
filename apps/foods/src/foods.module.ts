import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { CategoriesModule } from './categories/categories.module';
import { AUTH_SERVICE, PrismaService } from '@app/common';
import { CategoriesService } from './categories/categories.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CategoriesModule,
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
  providers: [FoodsService, CategoriesService, PrismaService, ConfigModule],
})
export class FoodsModule {}
