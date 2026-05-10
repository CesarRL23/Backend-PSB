import { Test, TestingModule } from '@nestjs/testing';
import { PasoLimpiezaController } from './paso-limpieza.controller';

describe('PasoLimpiezaController', () => {
  let controller: PasoLimpiezaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasoLimpiezaController],
    }).compile();

    controller = module.get<PasoLimpiezaController>(PasoLimpiezaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
