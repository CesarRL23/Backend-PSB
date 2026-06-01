import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciaPlagasController } from './evidencia-plagas.controller';
import { EvidenciaPlagasService } from './evidencia-plagas.service';

describe('EvidenciaPlagasController', () => {
  let controller: EvidenciaPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvidenciaPlagasController],
      providers: [EvidenciaPlagasService],
    }).compile();

    controller = module.get<EvidenciaPlagasController>(EvidenciaPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
