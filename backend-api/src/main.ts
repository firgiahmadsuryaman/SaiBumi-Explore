import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan CORS agar frontend Next.js dapat melakukan fetch request
  app.enableCors({
    origin: '*', // Di produksi harap batasi dengan origin yang spesifik
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend API berjalan di http://localhost:${port}`);
}
bootstrap();
