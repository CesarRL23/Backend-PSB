import { Test, TestingModule } from '@nestjs/testing';
import { HallazgoPlagasController } from './hallazgo-plagas.controller';
import { HallazgoPlagasService } from './hallazgo-plagas.service';

describe('HallazgoPlagasController', () => {
  let controller: HallazgoPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallazgoPlagasController],
      providers: [HallazgoPlagasService],
    }).compile();

    controller = module.get<HallazgoPlagasController>(HallazgoPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
