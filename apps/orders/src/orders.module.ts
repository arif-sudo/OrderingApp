import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi'
import { DatabaseModule } from '@app/common';
import { OrderRepository } from './orders.repo';
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './schemas/order.schema';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { BILING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URI: joi.string().required(),
        PORT: joi.number().required()
      }),
      envFilePath: './apps/orders/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RmqModule.register({
      name: BILING_SERVICE
    })
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule { }
