import { Test, TestingModule } from '@nestjs/testing';
import { HahaService } from './haha.service';

describe('HahaService', () => {
  let service: HahaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HahaService],
    }).compile();

    service = module.get<HahaService>(HahaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
