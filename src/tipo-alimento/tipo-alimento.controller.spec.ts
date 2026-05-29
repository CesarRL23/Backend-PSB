import { Test, TestingModule } from '@nestjs/testing';
import { TipoAlimentoController } from './tipo-alimento.controller';
import { TipoAlimentoService } from './tipo-alimento.service';

describe('TipoAlimentoController', () => {
  let controller: TipoAlimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAlimentoController],
      providers: [TipoAlimentoService],
    }).compile();

    controller = module.get<TipoAlimentoController>(TipoAlimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
