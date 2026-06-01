import { Test, TestingModule } from '@nestjs/testing';
import { PlaguicidaService } from './plaguicida.service';

describe('PlaguicidaService', () => {
  let service: PlaguicidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaguicidaService],
    }).compile();

    service = module.get<PlaguicidaService>(PlaguicidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
