import { Test, TestingModule } from '@nestjs/testing';
import { PlaguicidaController } from './plaguicida.controller';
import { PlaguicidaService } from './plaguicida.service';

describe('PlaguicidaController', () => {
  let controller: PlaguicidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaguicidaController],
      providers: [PlaguicidaService],
    }).compile();

    controller = module.get<PlaguicidaController>(PlaguicidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
