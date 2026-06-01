import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPlagasService } from './registro-plagas.service';

describe('RegistroPlagasService', () => {
  let service: RegistroPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroPlagasService],
    }).compile();

    service = module.get<RegistroPlagasService>(RegistroPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
