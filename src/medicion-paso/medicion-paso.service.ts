import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicionPaso } from './entities/medicion-paso.entity';
import { CreateMedicionPasoDto } from './dto/create-medicion-paso.dto';
import { UpdateMedicionPasoDto } from './dto/update-medicion-paso.dto';

@Injectable()
export class MedicionPasoService {

  constructor(
    @InjectRepository(MedicionPaso)
    private readonly repo: Repository<MedicionPaso>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateMedicionPasoDto): Promise<MedicionPaso> {
    const cumple = this.calcularCumple(dto.valor, dto.valorMinimoEsperado, dto.valorMaximoEsperado);
    const entity = this.repo.create({ ...dto, cumple });
    return this.repo.save(entity);
  }

  // ─── Listar por checklist ─────────────────────────────────────────────────────

  async findByChecklist(checklistLimpiezaId: string): Promise<MedicionPaso[]> {
    return this.repo.find({
      where: { checklistLimpiezaId },
      order: { createdAt: 'ASC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<MedicionPaso> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['checklistLimpieza'],
    });

    if (!entity) {
      throw new NotFoundException(`MedicionPaso #${id} no encontrada`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateMedicionPasoDto): Promise<MedicionPaso> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);

    const valor    = dto.valor                ?? entity.valor;
    const minimo   = dto.valorMinimoEsperado  ?? entity.valorMinimoEsperado;
    const maximo   = dto.valorMaximoEsperado  ?? entity.valorMaximoEsperado;
    entity.cumple  = this.calcularCumple(valor, minimo, maximo);

    return this.repo.save(entity);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }

  // ─── Lógica ──────────────────────────────────────────────────────────────────

  private calcularCumple(valor: number, minimo?: number, maximo?: number): boolean {
    if (minimo !== undefined && maximo !== undefined) return valor >= minimo && valor <= maximo;
    if (minimo !== undefined) return valor >= minimo;
    if (maximo !== undefined) return valor <= maximo;
    return true;
  }
}
