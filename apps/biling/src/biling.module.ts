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
        RMQ_URI: joi.string().required(),
        RMQ_BILING_QUEUE: joi.string().required()
      })
    }),
    RmqModule
  ],
  controllers: [BilingController],
  providers: [BilingService],
})
export class BilingModule {}
