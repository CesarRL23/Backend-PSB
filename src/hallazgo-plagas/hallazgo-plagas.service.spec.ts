import { Test, TestingModule } from '@nestjs/testing';
import { HallazgoPlagasService } from './hallazgo-plagas.service';

describe('HallazgoPlagasService', () => {
  let service: HallazgoPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HallazgoPlagasService],
    }).compile();

    service = module.get<HallazgoPlagasService>(HallazgoPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
