import { Module } from '@nestjs/common';
import { BilingController } from './biling.controller';
import { BilingService } from './biling.service';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi'
import { AuthModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RMQ_URI: joi.string().required(),
        RMQ_BILLING_QUEUE: joi.string().required()
      }),
    }),
    RmqModule,
    AuthModule
  ],
  controllers: [BilingController],
  providers: [BilingService],
})
export class BilingModule {}
