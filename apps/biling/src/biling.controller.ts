import { Controller, Get } from '@nestjs/common';
import { BilingService } from './biling.service';

@Controller()
export class BilingController {
  constructor(private readonly bilingService: BilingService) {}

  @Get()
  getHello(): string {
    return this.bilingService.getHello();
  }
}
