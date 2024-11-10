import { Test, TestingModule } from '@nestjs/testing';
import { LongitudeService } from './longitude.service';

describe('LongitudeService', () => {
  let service: LongitudeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LongitudeService],
    }).compile();

    service = module.get<LongitudeService>(LongitudeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
