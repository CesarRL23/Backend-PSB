import { Test, TestingModule } from '@nestjs/testing';
import { ProductoQuimicoController } from './producto-quimico.controller';

describe('ProductoQuimicoController', () => {
  let controller: ProductoQuimicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoQuimicoController],
    }).compile();

    controller = module.get<ProductoQuimicoController>(ProductoQuimicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
