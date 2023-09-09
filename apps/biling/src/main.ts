import { NestFactory } from '@nestjs/core';
import { BilingModule } from './biling.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { RmqOptions } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(BilingModule);
  const rmqService = app.get<RmqService>(RmqService)
  // obtain an instance of the RmqService class. This function is used for dependency injection in NestJS
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('BILLING'))

  await app.startAllMicroservices();
}

bootstrap();
