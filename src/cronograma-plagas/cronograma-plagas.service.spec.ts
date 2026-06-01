import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaPlagasService } from './cronograma-plagas.service';

describe('CronogramaPlagasService', () => {
  let service: CronogramaPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronogramaPlagasService],
    }).compile();

    service = module.get<CronogramaPlagasService>(CronogramaPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
