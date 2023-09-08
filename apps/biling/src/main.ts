import { NestFactory } from '@nestjs/core';
import { BilingModule } from './biling.module';

async function bootstrap() {
  const app = await NestFactory.create(BilingModule);
  await app.listen(3000);
}
bootstrap();
