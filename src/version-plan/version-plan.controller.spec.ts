import { Test, TestingModule } from '@nestjs/testing';
import { VersionPlanController } from './version-plan.controller';

describe('VersionPlanController', () => {
  let controller: VersionPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionPlanController],
    }).compile();

    controller = module.get<VersionPlanController>(VersionPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
