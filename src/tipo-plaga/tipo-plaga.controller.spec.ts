import { Test, TestingModule } from '@nestjs/testing';
import { TipoPlagaController } from './tipo-plaga.controller';
import { TipoPlagaService } from './tipo-plaga.service';

describe('TipoPlagaController', () => {
  let controller: TipoPlagaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPlagaController],
      providers: [TipoPlagaService],
    }).compile();

    controller = module.get<TipoPlagaController>(TipoPlagaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
