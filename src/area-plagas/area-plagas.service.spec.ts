import { Test, TestingModule } from '@nestjs/testing';
import { AreaPlagasService } from './area-plagas.service';

describe('AreaPlagasService', () => {
  let service: AreaPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaPlagasService],
    }).compile();

    service = module.get<AreaPlagasService>(AreaPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
