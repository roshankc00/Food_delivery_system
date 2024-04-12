import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const config = new DocumentBuilder()
    .setTitle('orderMicroservice')
    .setDescription('this is the user orderMicroservice ')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter the Bearer token',
      in: 'header',
    })

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3008);
}
bootstrap();
