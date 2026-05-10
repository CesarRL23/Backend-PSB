import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistLimpiezaService } from './checklist-limpieza.service';

describe('ChecklistLimpiezaService', () => {
  let service: ChecklistLimpiezaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecklistLimpiezaService],
    }).compile();

    service = module.get<ChecklistLimpiezaService>(ChecklistLimpiezaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
