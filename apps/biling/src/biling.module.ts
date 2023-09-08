import { Module } from '@nestjs/common';
import { BilingController } from './biling.controller';
import { BilingService } from './biling.service';

@Module({
  imports: [],
  controllers: [BilingController],
  providers: [BilingService],
})
export class BilingModule {}
