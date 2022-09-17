import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParserMiddleware } from './middlewares/parser.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new ParserMiddleware().use);
  await app.listen(3000);
}
bootstrap();
