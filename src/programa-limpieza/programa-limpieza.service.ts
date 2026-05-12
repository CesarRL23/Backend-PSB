import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProgramaLimpieza } from './entities/programa-limpieza.entity';
import { CreateProgramaLimpiezaDto } from './dto/create-programa-limpieza.dto';
import { UpdateProgramaLimpiezaDto } from './dto/update-programa-limpieza.dto';

@Injectable()
export class ProgramaLimpiezaService {

  constructor(
    @InjectRepository(ProgramaLimpieza)
    private readonly repo: Repository<ProgramaLimpieza>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateProgramaLimpiezaDto): Promise<ProgramaLimpieza> {
    const existente = await this.repo.findOne({
      where: { programaId: dto.programaId },
    });

    if (existente) {
      throw new ConflictException(
        `Ya existe un programa de limpieza para el programa ${dto.programaId}`,
      );
    }

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<ProgramaLimpieza[]> {
    return this.repo.find({
      relations: ['programa'],
      order: { createdAt: 'DESC' },
    });
  }

  // ─── Buscar por ID ───────────────────────────────────────────────────────────

  async findOne(id: string): Promise<ProgramaLimpieza> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['programa'],
    });

    if (!entity) {
      throw new NotFoundException(`ProgramaLimpieza #${id} no encontrado`);
    }

    return entity;
  }

  // ─── Buscar por programa_id ──────────────────────────────────────────────────

  async findByProgramaId(programaId: string): Promise<ProgramaLimpieza> {
    const entity = await this.repo.findOne({
      where: { programaId },
      relations: ['programa'],
    });

    if (!entity) {
      throw new NotFoundException(
        `No existe programa de limpieza para el programa ${programaId}`,
      );
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateProgramaLimpiezaDto): Promise<ProgramaLimpieza> {
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
