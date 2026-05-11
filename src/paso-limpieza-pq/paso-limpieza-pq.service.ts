import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasoLimpiezaPq } from './entities/paso-limpieza-pq.entity';
import { CreatePasoLimpiezaPqDto } from './dto/create-paso-limpieza-pq.dto';
import { UpdatePasoLimpiezaPqDto } from './dto/update-paso-limpieza-pq.dto';

@Injectable()
export class PasoLimpiezaPqService {

  constructor(
    @InjectRepository(PasoLimpiezaPq)
    private readonly repo: Repository<PasoLimpiezaPq>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreatePasoLimpiezaPqDto): Promise<PasoLimpiezaPq> {
    const existente = await this.repo.findOne({
      where: {
        pasoLimpiezaId: dto.pasoLimpiezaId,
        productoQuimicoId: dto.productoQuimicoId,
      },
    });

    if (existente) {
      throw new ConflictException(
        `Este producto químico ya está asignado a ese paso de limpieza`,
      );
    }

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar por paso de limpieza ─────────────────────────────────────────────

  async findByPasoLimpieza(pasoLimpiezaId: string): Promise<PasoLimpiezaPq[]> {
    return this.repo.find({
      where: { pasoLimpiezaId },
      relations: ['productoQuimico'],
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<PasoLimpiezaPq> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['pasoLimpieza', 'productoQuimico'],
    });

    if (!entity) {
      throw new NotFoundException(`PasoLimpiezaPq #${id} no encontrado`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdatePasoLimpiezaPqDto): Promise<PasoLimpiezaPq> {
    const entity = await this.findOne(id);

    if (dto.productoQuimicoId && dto.productoQuimicoId !== entity.productoQuimicoId) {
      const conflicto = await this.repo.findOne({
        where: {
          pasoLimpiezaId: entity.pasoLimpiezaId,
          productoQuimicoId: dto.productoQuimicoId,
        },
      });
      if (conflicto) {
        throw new ConflictException(
          `Este producto químico ya está asignado a ese paso de limpieza`,
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
