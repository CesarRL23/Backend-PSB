import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProgramaAguaService } from './programa-agua.service';
import { ProgramaAgua } from './entities/programa-agua.entity';

describe('ProgramaAguaService', () => {
  let service: ProgramaAguaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramaAguaService,
        {
          provide: getRepositoryToken(ProgramaAgua),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProgramaAguaService>(ProgramaAguaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
