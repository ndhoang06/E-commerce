import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { corsConfig, sessionConfig } from './utils/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.set('trust proxy', 1); // trust first proxy
  app.enableCors({
    origin: ['http://localhost:8080'],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  // app.use(session(sessionConfig(MongoDBStore)));
  app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
    })
  )
  const config = new DocumentBuilder()
    .setTitle("Example")
    .setDescription(" Example")
    .setVersion('1.0')
    .addTag('Example')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT || 3000, () => {
    console.log('connect oke')
  });
}
bootstrap();
