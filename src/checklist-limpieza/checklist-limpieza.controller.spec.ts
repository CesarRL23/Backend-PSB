import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistLimpiezaController } from './checklist-limpieza.controller';

describe('ChecklistLimpiezaController', () => {
  let controller: ChecklistLimpiezaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistLimpiezaController],
    }).compile();

    controller = module.get<ChecklistLimpiezaController>(ChecklistLimpiezaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
