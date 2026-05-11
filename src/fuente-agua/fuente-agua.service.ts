import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FuenteAgua } from './entities/fuente-agua.entity';
import { CreateFuenteAguaDto } from './dto/create-fuente-agua.dto';
import { UpdateFuenteAguaDto } from './dto/update-fuente-agua.dto';

@Injectable()
export class FuenteAguaService {

  constructor(
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateFuenteAguaDto): Promise<FuenteAgua> {
    const fuenteAgua = this.fuenteAguaRepository.create(dto);
    return this.fuenteAguaRepository.save(fuenteAgua);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<FuenteAgua[]> {
    return this.fuenteAguaRepository.find({
      relations: [
        'programaAgua',
        'tanqueAlmacenamiento',
        'controlesDiarios',
        'analisisLaboratorio',
        'mantenimientos',
      ],
    });
  }

  // ─── Listar por programa agua ─────────────────────────────────────────────────

  async findByProgramaAgua(programaAguaId: string): Promise<FuenteAgua[]> {
    return this.fuenteAguaRepository.find({
      where: { programaAguaId },
      relations: [
        'tanqueAlmacenamiento',
        'controlesDiarios',
        'analisisLaboratorio',
        'mantenimientos',
      ],
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<FuenteAgua> {
    const fuenteAgua = await this.fuenteAguaRepository.findOne({
      where: { id },
      relations: [
        'programaAgua',
        'tanqueAlmacenamiento',
        'controlesDiarios',
        'analisisLaboratorio',
        'mantenimientos',
      ],
    });

    if (!fuenteAgua) {
      throw new NotFoundException(`FuenteAgua #${id} no encontrada`);
    }

    return fuenteAgua;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateFuenteAguaDto): Promise<FuenteAgua> {
    const fuenteAgua = await this.findOne(id);
    Object.assign(fuenteAgua, dto);
    return this.fuenteAguaRepository.save(fuenteAgua);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const fuenteAgua = await this.findOne(id);
    await this.fuenteAguaRepository.remove(fuenteAgua);
  }
}