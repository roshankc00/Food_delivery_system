import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: '3001',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.startAllMicroservices();

  // keep in the enviroment variable
  await app.listen(4000);
}
bootstrap();
