import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnalisisLaboratorioService } from './analisis-laboratorio.service';
import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';

describe('AnalisisLaboratorioService', () => {
  let service: AnalisisLaboratorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalisisLaboratorioService,
        {
          provide: getRepositoryToken(AnalisisLaboratorio),
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

    service = module.get<AnalisisLaboratorioService>(AnalisisLaboratorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
