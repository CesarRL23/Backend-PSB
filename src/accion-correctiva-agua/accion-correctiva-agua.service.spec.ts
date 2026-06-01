import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccionCorrectivaAguaService } from './accion-correctiva-agua.service';
import { AccionCorrectivaAgua } from './entities/accion-correctiva-agua.entity';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';

describe('AccionCorrectivaAguaService', () => {
  let service: AccionCorrectivaAguaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccionCorrectivaAguaService,
        {
          provide: getRepositoryToken(AccionCorrectivaAgua),
          useValue: {},
        },
        {
          provide: AguaRegistroCreatorService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AccionCorrectivaAguaService>(AccionCorrectivaAguaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
