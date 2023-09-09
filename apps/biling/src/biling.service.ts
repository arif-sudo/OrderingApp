import { Injectable } from '@nestjs/common';

@Injectable()
export class BilingService {
  getHello(): string {
    return 'Hello World! fvrom biling';
  }
}
