import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MantenimientoLavadoService } from './mantenimiento-lavado.service';
import { MantenimientoLavado } from './entities/mantenimiento-lavado.entity';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';

describe('MantenimientoLavadoService', () => {
  let service: MantenimientoLavadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MantenimientoLavadoService,
        {
          provide: getRepositoryToken(MantenimientoLavado),
          useValue: {},
        },
        {
          provide: AguaRegistroCreatorService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MantenimientoLavadoService>(MantenimientoLavadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
