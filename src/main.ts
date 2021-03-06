import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('TWin shop')
    .setDescription('The API TWin-shop server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
	// TO DO: Read more about validation pipeline 
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 3000);

	console.log('');
	console.log(`[Swagger]                                  http://localhost:${3000}/api`);
	console.log('');
}
bootstrap();
