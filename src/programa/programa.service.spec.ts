import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProgramaService } from './programa.service';
import { Programa } from './entities/programa.entity';

describe('ProgramaService', () => {
  let service: ProgramaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramaService,
        {
          provide: getRepositoryToken(Programa),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProgramaService>(ProgramaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
