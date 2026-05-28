import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TanqueAlmacenamientoService } from './tanque-almacenamiento.service';
import { TanqueAlmacenamiento } from './entities/tanque-almacenamiento.entity';

describe('TanqueAlmacenamientoService', () => {
  let service: TanqueAlmacenamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TanqueAlmacenamientoService,
        {
          provide: getRepositoryToken(TanqueAlmacenamiento),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TanqueAlmacenamientoService>(TanqueAlmacenamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
