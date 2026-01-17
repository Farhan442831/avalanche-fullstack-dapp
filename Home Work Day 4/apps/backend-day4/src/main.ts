import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. AKTIFKAN CORS (WAJIB BIAR GAK FAILED TO FETCH)
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Simple Storage dApp API')
    .setDescription('The Simple Storage dApp API description')
    .setVersion('1.0')
    .addTag('simple-storage')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000/documentation');
}
bootstrap();