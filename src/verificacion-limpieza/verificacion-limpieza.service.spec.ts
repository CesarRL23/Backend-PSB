import { Test, TestingModule } from '@nestjs/testing';
import { VerificacionLimpiezaService } from './verificacion-limpieza.service';

describe('VerificacionLimpiezaService', () => {
  let service: VerificacionLimpiezaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificacionLimpiezaService],
    }).compile();

    service = module.get<VerificacionLimpiezaService>(VerificacionLimpiezaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
