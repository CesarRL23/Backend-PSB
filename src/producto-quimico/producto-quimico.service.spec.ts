import { Test, TestingModule } from '@nestjs/testing';
import { ProductoQuimicoService } from './producto-quimico.service';

describe('ProductoQuimicoService', () => {
  let service: ProductoQuimicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoQuimicoService],
    }).compile();

    service = module.get<ProductoQuimicoService>(ProductoQuimicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
