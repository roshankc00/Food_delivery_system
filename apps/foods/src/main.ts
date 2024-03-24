import { NestFactory } from '@nestjs/core';
import { FoodsModule } from './foods.module';

async function bootstrap() {
  const app = await NestFactory.create(FoodsModule);
  await app.listen(3002);
}
bootstrap();
