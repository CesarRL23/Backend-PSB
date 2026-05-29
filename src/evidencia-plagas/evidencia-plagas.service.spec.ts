import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciaPlagasService } from './evidencia-plagas.service';

describe('EvidenciaPlagasService', () => {
  let service: EvidenciaPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvidenciaPlagasService],
    }).compile();

    service = module.get<EvidenciaPlagasService>(EvidenciaPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
