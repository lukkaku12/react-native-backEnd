import { Test, TestingModule } from '@nestjs/testing';
import { LatitudeController } from './latitude.controller';
import { LatitudeService } from './latitude.service';

describe('LatitudeController', () => {
  let controller: LatitudeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LatitudeController],
      providers: [LatitudeService],
    }).compile();

    controller = module.get<LatitudeController>(LatitudeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
