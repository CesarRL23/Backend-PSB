import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegistroLimpieza } from './entities/registro-limpieza.entity';
import { CreateRegistroLimpiezaDto } from './dto/create-registro-limpieza.dto';
import { UpdateRegistroLimpiezaDto } from './dto/update-registro-limpieza.dto';

@Injectable()
export class RegistroLimpiezaService {

  constructor(
    @InjectRepository(RegistroLimpieza)
    private readonly repo: Repository<RegistroLimpieza>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateRegistroLimpiezaDto): Promise<RegistroLimpieza> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar todos ────────────────────────────────────────────────────────────

  async findAll(): Promise<RegistroLimpieza[]> {
    return this.repo.find({
      relations: ['registro', 'programaLimpieza'],
      order: { createdAt: 'DESC' },
    });
  }

  // ─── Listar por registro base ─────────────────────────────────────────────────

  async findByRegistro(registroId: string): Promise<RegistroLimpieza[]> {
    return this.repo.find({
      where: { registroId },
      relations: ['programaLimpieza'],
      order: { createdAt: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<RegistroLimpieza> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['registro', 'programaLimpieza'],
    });

    if (!entity) {
      throw new NotFoundException(`RegistroLimpieza #${id} no encontrado`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateRegistroLimpiezaDto): Promise<RegistroLimpieza> {
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
