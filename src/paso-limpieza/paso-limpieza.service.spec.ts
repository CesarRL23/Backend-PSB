import { Test, TestingModule } from '@nestjs/testing';
import { PasoLimpiezaService } from './paso-limpieza.service';

describe('PasoLimpiezaService', () => {
  let service: PasoLimpiezaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasoLimpiezaService],
    }).compile();

    service = module.get<PasoLimpiezaService>(PasoLimpiezaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
