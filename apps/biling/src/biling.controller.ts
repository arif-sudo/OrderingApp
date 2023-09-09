import { Controller, Get } from '@nestjs/common';
import { BilingService } from './biling.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class BilingController {
  constructor(private readonly bilingService: BilingService) { }

  @Get()
  getHello(): string {
    return this.bilingService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreate(@Payload() data: any, @Ctx() context: RmqContext) {
    this.bilingService.bill(data, context)
  }
}
