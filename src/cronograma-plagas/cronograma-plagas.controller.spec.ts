import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaPlagasController } from './cronograma-plagas.controller';
import { CronogramaPlagasService } from './cronograma-plagas.service';

describe('CronogramaPlagasController', () => {
  let controller: CronogramaPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronogramaPlagasController],
      providers: [CronogramaPlagasService],
    }).compile();

    controller = module.get<CronogramaPlagasController>(CronogramaPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
