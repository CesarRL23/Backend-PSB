import { Test, TestingModule } from '@nestjs/testing';
import { AccionCorrectivaPlagasController } from './accion-correctiva-plagas.controller';
import { AccionCorrectivaPlagasService } from './accion-correctiva-plagas.service';

describe('AccionCorrectivaPlagasController', () => {
  let controller: AccionCorrectivaPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccionCorrectivaPlagasController],
      providers: [AccionCorrectivaPlagasService],
    }).compile();

    controller = module.get<AccionCorrectivaPlagasController>(AccionCorrectivaPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
