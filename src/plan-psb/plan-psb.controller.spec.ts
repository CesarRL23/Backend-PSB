import { Test, TestingModule } from '@nestjs/testing';
import { PlanPsbController } from './plan-psb.controller';

describe('PlanPsbController', () => {
  let controller: PlanPsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanPsbController],
    }).compile();

    controller = module.get<PlanPsbController>(PlanPsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
