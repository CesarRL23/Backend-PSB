import { Test, TestingModule } from '@nestjs/testing';
import { TipoAlimentoController } from './tipo-alimento.controller';

describe('TipoAlimentoController', () => {
  let controller: TipoAlimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAlimentoController],
    }).compile();

    controller = module.get<TipoAlimentoController>(TipoAlimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
