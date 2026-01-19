import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bagian ini yang bikin Frontend Vercel lo bisa narik data tanpa di-block
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Identitas lo biar instruktur tau ini hasil kerja keras lo
  const config = new DocumentBuilder()
    .setTitle('Muchammad Farhan Ramadhan - 231011402182')
    .setDescription('The Avalanche Fullstack DApp API description')
    .setVersion('1.0')
    .addTag('avalanche')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // Pakai process.env.PORT biar Railway nggak bingung
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/documentation`);
}
bootstrap();