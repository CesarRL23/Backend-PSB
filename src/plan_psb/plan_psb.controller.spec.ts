import { Test, TestingModule } from '@nestjs/testing';
import { PlanPsbController } from './plan_psb.controller';
import { PlanPsbService } from './plan_psb.service';

describe('PlanPsbController', () => {
  let controller: PlanPsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanPsbController],
      providers: [PlanPsbService],
    }).compile();

    controller = module.get<PlanPsbController>(PlanPsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
