import { Controller, Get } from '@nestjs/common';
import { BilingService } from './biling.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from '@app/common/rmq/rmq.service';

@Controller()
export class BilingController {
  constructor(private readonly bilingService: BilingService, private readonly rmqService: RmqService) { }

  @Get()
  getHello(): string {
    return this.bilingService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreate(@Payload() data: any, @Ctx() context: RmqContext) {
    this.bilingService.bill(data)
    this.rmqService.ack(context)
  }
}
