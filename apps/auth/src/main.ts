import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    host: 'localhost',
    port: '3001',
  });
  await app.startAllMicroservices();
  app.listen(3000);
}
bootstrap();
