import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BilingService {
  private readonly logger = new Logger(BilingService.name)

  getHello(): string {
    return 'Hello World! fvrom biling';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async bill(data: any, context) {
    this.logger.log('Billing... ', data)
  }
}
