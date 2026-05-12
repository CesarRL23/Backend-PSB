import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasoLimpieza } from './entities/paso-limpieza.entity';
import { CreatePasoLimpiezaDto } from './dto/create-paso-limpieza.dto';
import { UpdatePasoLimpiezaDto } from './dto/update-paso-limpieza.dto';

@Injectable()
export class PasoLimpiezaService {

  constructor(
    @InjectRepository(PasoLimpieza)
    private readonly repo: Repository<PasoLimpieza>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreatePasoLimpiezaDto): Promise<PasoLimpieza> {
    const existente = await this.repo.findOne({
      where: { programaLimpiezaId: dto.programaLimpiezaId, orden: dto.orden },
    });

    if (existente) {
      throw new ConflictException(
        `Ya existe un paso con orden ${dto.orden} en este programa de limpieza`,
      );
    }

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar todos ────────────────────────────────────────────────────────────

  async findAll(): Promise<PasoLimpieza[]> {
    return this.repo.find({
      relations: ['programaLimpieza'],
      order: { orden: 'ASC' },
    });
  }

  // ─── Listar por programa de limpieza ─────────────────────────────────────────

  async findByProgramaLimpieza(programaLimpiezaId: string): Promise<PasoLimpieza[]> {
    return this.repo.find({
      where: { programaLimpiezaId },
      order: { orden: 'ASC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<PasoLimpieza> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['programaLimpieza'],
    });

    if (!entity) {
      throw new NotFoundException(`PasoLimpieza #${id} no encontrado`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdatePasoLimpiezaDto): Promise<PasoLimpieza> {
    const entity = await this.findOne(id);

    if (dto.orden && dto.orden !== entity.orden) {
      const conflicto = await this.repo.findOne({
        where: { programaLimpiezaId: entity.programaLimpiezaId, orden: dto.orden },
      });
      if (conflicto) {
        throw new ConflictException(
          `Ya existe un paso con orden ${dto.orden} en este programa de limpieza`,
        );
      }
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
