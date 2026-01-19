import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. AKTIFKAN CORS agar Frontend bisa narik data
  app.enableCors(); 

  const config = new DocumentBuilder()
    .setTitle('Muchammad Farhan Ramadhan - 231011402182')
    .setDescription('Tugas Day 5: Final Full Stack dApp Integration')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // 2. GUNAKAN PORT DINAMIS untuk Railway
  const port = process.env.PORT || 3000; 
  await app.listen(port);
  
  console.log(`Backend running on: http://localhost:${port}/documentation`);
}
bootstrap();