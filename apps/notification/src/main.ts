import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(NotificationModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    path: 'localhost',
    port: '3004',
  });
  app.startAllMicroservices();
}
bootstrap();
