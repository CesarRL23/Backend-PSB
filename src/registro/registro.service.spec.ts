import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegistroService } from './registro.service';
import { Registro } from './entities/registro.entity';

describe('RegistroService', () => {
  let service: RegistroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistroService,
        {
          provide: getRepositoryToken(Registro),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RegistroService>(RegistroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
