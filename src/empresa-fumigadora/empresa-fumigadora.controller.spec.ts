import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaFumigadoraController } from './empresa-fumigadora.controller';
import { EmpresaFumigadoraService } from './empresa-fumigadora.service';

describe('EmpresaFumigadoraController', () => {
  let controller: EmpresaFumigadoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaFumigadoraController],
      providers: [EmpresaFumigadoraService],
    }).compile();

    controller = module.get<EmpresaFumigadoraController>(EmpresaFumigadoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
