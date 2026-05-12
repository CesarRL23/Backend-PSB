import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoPlagasController } from './diagnostico-plagas.controller';
import { DiagnosticoPlagasService } from './diagnostico-plagas.service';

describe('DiagnosticoPlagasController', () => {
  let controller: DiagnosticoPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticoPlagasController],
      providers: [DiagnosticoPlagasService],
    }).compile();

    controller = module.get<DiagnosticoPlagasController>(DiagnosticoPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
