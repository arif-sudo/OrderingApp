import { Module } from '@nestjs/common';
import { BilingController } from './biling.controller';
import { BilingService } from './biling.service';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RMQ_URI: 'amqp://rabbitmq:5672',
        RMQ_BILLING_QUEUE: 'billing'
      }),
      envFilePath: './apps/biling/.env'
    }),
    RmqModule
  ],
  controllers: [BilingController],
  providers: [BilingService],
})
export class BilingModule {}
