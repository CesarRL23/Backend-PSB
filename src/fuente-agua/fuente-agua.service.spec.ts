import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuenteAguaService } from './fuente-agua.service';
import { FuenteAgua } from './entities/fuente-agua.entity';

describe('FuenteAguaService', () => {
  let service: FuenteAguaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuenteAguaService,
        {
          provide: getRepositoryToken(FuenteAgua),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FuenteAguaService>(FuenteAguaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
