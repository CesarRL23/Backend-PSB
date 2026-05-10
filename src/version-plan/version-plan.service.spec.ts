import { Test, TestingModule } from '@nestjs/testing';
import { VersionPlanService } from './version-plan.service';

describe('VersionPlanService', () => {
  let service: VersionPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionPlanService],
    }).compile();

    service = module.get<VersionPlanService>(VersionPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
