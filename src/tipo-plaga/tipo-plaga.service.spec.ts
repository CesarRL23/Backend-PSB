import { Test, TestingModule } from '@nestjs/testing';
import { TipoPlagaService } from './tipo-plaga.service';

describe('TipoPlagaService', () => {
  let service: TipoPlagaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoPlagaService],
    }).compile();

    service = module.get<TipoPlagaService>(TipoPlagaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
