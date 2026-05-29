import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaFumigadoraService } from './empresa-fumigadora.service';

describe('EmpresaFumigadoraService', () => {
  let service: EmpresaFumigadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresaFumigadoraService],
    }).compile();

    service = module.get<EmpresaFumigadoraService>(EmpresaFumigadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
