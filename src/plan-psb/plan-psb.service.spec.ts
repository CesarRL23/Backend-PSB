import { Test, TestingModule } from '@nestjs/testing';
import { PlanPsbService } from './plan-psb.service';

describe('PlanPsbService', () => {
  let service: PlanPsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanPsbService],
    }).compile();

    service = module.get<PlanPsbService>(PlanPsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
