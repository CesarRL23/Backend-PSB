import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegistroAguaService } from './registro-agua.service';
import { RegistroAgua } from './entities/registro-agua.entity';

describe('RegistroAguaService', () => {
  let service: RegistroAguaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistroAguaService,
        {
          provide: getRepositoryToken(RegistroAgua),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RegistroAguaService>(RegistroAguaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
