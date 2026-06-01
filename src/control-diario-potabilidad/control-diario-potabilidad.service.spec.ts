import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ControlDiarioPotabilidadService } from './control-diario-potabilidad.service';
import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';

describe('ControlDiarioPotabilidadService', () => {
  let service: ControlDiarioPotabilidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ControlDiarioPotabilidadService,
        {
          provide: getRepositoryToken(ControlDiarioPotabilidad),
          useValue: {},
        },
        {
          provide: NotificationsService,
          useValue: {},
        },
        {
          provide: AguaRegistroCreatorService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ControlDiarioPotabilidadService>(ControlDiarioPotabilidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
