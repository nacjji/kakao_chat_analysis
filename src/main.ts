import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.use(express.static(join(__dirname, '..', 'public')));

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('chat')
    .setDescription('chat API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    exposedHeaders: ['Authorization'],
  });

  await app.listen(port);
}
bootstrap();
