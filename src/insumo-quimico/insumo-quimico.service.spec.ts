import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsumoQuimicoService } from './insumo-quimico.service';
import { InsumoQuimico } from './entities/insumo-quimico.entity';

describe('InsumoQuimicoService', () => {
  let service: InsumoQuimicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsumoQuimicoService,
        {
          provide: getRepositoryToken(InsumoQuimico),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<InsumoQuimicoService>(InsumoQuimicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
