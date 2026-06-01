import { Test, TestingModule } from '@nestjs/testing';
import { AccionCorrectivaPlagasService } from './accion-correctiva-plagas.service';

describe('AccionCorrectivaPlagasService', () => {
  let service: AccionCorrectivaPlagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccionCorrectivaPlagasService],
    }).compile();

    service = module.get<AccionCorrectivaPlagasService>(AccionCorrectivaPlagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
