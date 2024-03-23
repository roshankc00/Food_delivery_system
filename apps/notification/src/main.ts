import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    path: 'localhost',
    port: '3004',
  });
  await app.listen(3000);
}
bootstrap();
