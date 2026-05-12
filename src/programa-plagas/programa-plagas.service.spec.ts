import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaPlagasService } from './programa-plagas.service';

describe('ProgramaPlagasService', () => {
  let service: ProgramaPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaPlagasService],
    }).compile();

    service = module.get<ProgramaPlagasService>(ProgramaPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
