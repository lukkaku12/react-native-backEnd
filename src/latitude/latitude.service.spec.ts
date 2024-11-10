import { Test, TestingModule } from '@nestjs/testing';
import { LatitudeService } from './latitude.service';

describe('LatitudeService', () => {
  let service: LatitudeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatitudeService],
    }).compile();

    service = module.get<LatitudeService>(LatitudeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
