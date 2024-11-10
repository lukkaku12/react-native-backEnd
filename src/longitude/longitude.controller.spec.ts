import { Test, TestingModule } from '@nestjs/testing';
import { LongitudeController } from './longitude.controller';
import { LongitudeService } from './longitude.service';

describe('LongitudeController', () => {
  let controller: LongitudeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LongitudeController],
      providers: [LongitudeService],
    }).compile();

    controller = module.get<LongitudeController>(LongitudeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
