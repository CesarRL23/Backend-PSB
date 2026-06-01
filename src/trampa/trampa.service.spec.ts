import { Test, TestingModule } from '@nestjs/testing';
import { TrampaService } from './trampa.service';

describe('TrampaService', () => {
  let service: TrampaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrampaService],
    }).compile();

    service = module.get<TrampaService>(TrampaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
