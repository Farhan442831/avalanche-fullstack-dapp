import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Muchammad Farhan Ramadhan - 231011402182') // Nama & NIM lo di sini
    .setDescription('Tugas Day 4: Blockchain Module Integration with Avalanche')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document); // Ini jalur buat buka di browser

  await app.listen(3000);
  console.log('Server running at http://localhost:3000/documentation');
}
bootstrap();