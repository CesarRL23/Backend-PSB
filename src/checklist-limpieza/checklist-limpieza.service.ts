import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChecklistLimpieza } from './entities/checklist-limpieza.entity';
import { CreateChecklistLimpiezaDto } from './dto/create-checklist-limpieza.dto';
import { UpdateChecklistLimpiezaDto } from './dto/update-checklist-limpieza.dto';

@Injectable()
export class ChecklistLimpiezaService {

  constructor(
    @InjectRepository(ChecklistLimpieza)
    private readonly repo: Repository<ChecklistLimpieza>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateChecklistLimpiezaDto): Promise<ChecklistLimpieza> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar por registro de limpieza ─────────────────────────────────────────

  async findByRegistroLimpieza(registroLimpiezaId: string): Promise<ChecklistLimpieza[]> {
    return this.repo.find({
      where: { registroLimpiezaId },
      relations: ['pasoLimpieza'],
      order: { createdAt: 'ASC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<ChecklistLimpieza> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['registroLimpieza', 'pasoLimpieza'],
    });

    if (!entity) {
      throw new NotFoundException(`ChecklistLimpieza #${id} no encontrado`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateChecklistLimpiezaDto): Promise<ChecklistLimpieza> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
