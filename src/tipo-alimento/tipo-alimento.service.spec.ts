import { Test, TestingModule } from '@nestjs/testing';
import { TipoAlimentoService } from './tipo-alimento.service';

describe('TipoAlimentoService', () => {
  let service: TipoAlimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoAlimentoService],
    }).compile();

    service = module.get<TipoAlimentoService>(TipoAlimentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
