import { Test, TestingModule } from '@nestjs/testing';
import { VerificacionLimpiezaController } from './verificacion-limpieza.controller';

describe('VerificacionLimpiezaController', () => {
  let controller: VerificacionLimpiezaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificacionLimpiezaController],
    }).compile();

    controller = module.get<VerificacionLimpiezaController>(VerificacionLimpiezaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
