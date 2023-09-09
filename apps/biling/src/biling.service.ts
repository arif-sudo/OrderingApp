import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BilingService {
  private readonly logger = new Logger(BilingService.name)

  getHello(): string {
    return 'Hello World! fvrom biling';
  }
  async bill(data: any) {
    this.logger.log('Billing... ', data)
  }
}
