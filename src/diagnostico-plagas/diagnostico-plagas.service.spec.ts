import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoPlagasService } from './diagnostico-plagas.service';

describe('DiagnosticoPlagasService', () => {
  let service: DiagnosticoPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosticoPlagasService],
    }).compile();

    service = module.get<DiagnosticoPlagasService>(DiagnosticoPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
