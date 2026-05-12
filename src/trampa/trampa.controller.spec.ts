import { Test, TestingModule } from '@nestjs/testing';
import { TrampaController } from './trampa.controller';
import { TrampaService } from './trampa.service';

describe('TrampaController', () => {
  let controller: TrampaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrampaController],
      providers: [TrampaService],
    }).compile();

    controller = module.get<TrampaController>(TrampaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
