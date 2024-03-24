import { Test, TestingModule } from '@nestjs/testing';
import { HahaController } from './haha.controller';
import { HahaService } from './haha.service';

describe('HahaController', () => {
  let controller: HahaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HahaController],
      providers: [HahaService],
    }).compile();

    controller = module.get<HahaController>(HahaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
