import { Test, TestingModule } from '@nestjs/testing';
import { BilingController } from './biling.controller';
import { BilingService } from './biling.service';

describe('BilingController', () => {
  let bilingController: BilingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BilingController],
      providers: [BilingService],
    }).compile();

    bilingController = app.get<BilingController>(BilingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bilingController.getHello()).toBe('Hello World!');
    });
  });
});
