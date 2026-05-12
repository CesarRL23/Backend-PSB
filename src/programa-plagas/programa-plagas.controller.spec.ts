import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaPlagasController } from './programa-plagas.controller';
import { ProgramaPlagasService } from './programa-plagas.service';

describe('ProgramaPlagasController', () => {
  let controller: ProgramaPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaPlagasController],
      providers: [ProgramaPlagasService],
    }).compile();

    controller = module.get<ProgramaPlagasController>(ProgramaPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
