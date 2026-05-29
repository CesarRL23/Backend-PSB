import { Test, TestingModule } from '@nestjs/testing';
import { AreaPlagasController } from './area-plagas.controller';
import { AreaPlagasService } from './area-plagas.service';

describe('AreaPlagasController', () => {
  let controller: AreaPlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaPlagasController],
      providers: [AreaPlagasService],
    }).compile();

    controller = module.get<AreaPlagasController>(AreaPlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
