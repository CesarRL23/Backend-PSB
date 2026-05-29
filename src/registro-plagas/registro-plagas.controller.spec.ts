import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPlagasController } from './registro-plagas.controller';
import { RegistroPlagasService } from './registro-plagas.service';

describe('RegistroPlagasController', () => {
  let controller: RegistroPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroPlagasController],
      providers: [RegistroPlagasService],
    }).compile();

    controller = module.get<RegistroPlagasController>(RegistroPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
