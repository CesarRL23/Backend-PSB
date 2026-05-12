import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { InsumoQuimico } from './entities/insumo-quimico.entity';
import { CreateInsumoQuimicoDto } from './dto/create-insumo-quimico.dto';
import { UpdateInsumoQuimicoDto } from './dto/update-insumo-quimico.dto';

@Injectable()
export class InsumoQuimicoService {

  constructor(
    @InjectRepository(InsumoQuimico)
    private readonly insumoRepository: Repository<InsumoQuimico>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateInsumoQuimicoDto): Promise<InsumoQuimico> {
    if (dto.fechaVencimiento) {
      this.validarFechaVencimiento(dto.fechaVencimiento);
    }

    const insumo = this.insumoRepository.create(dto);
    return this.insumoRepository.save(insumo);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<InsumoQuimico[]> {
    return this.insumoRepository.find({
      relations: ['mantenimiento'],
    });
  }

  // ─── Listar por mantenimiento ─────────────────────────────────────────────────

  async findByMantenimiento(mantenimientoId: string): Promise<InsumoQuimico[]> {
    return this.insumoRepository.find({
      where: { mantenimientoId },
    });
  }

  // ─── Listar vencidos ─────────────────────────────────────────────────────────

  async findVencidos(): Promise<InsumoQuimico[]> {
    const hoy = new Date().toISOString().slice(0, 10);
    return this.insumoRepository.find({
      where: { fechaVencimiento: LessThan(hoy) },
      relations: ['mantenimiento'],
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<InsumoQuimico> {
    const insumo = await this.insumoRepository.findOne({
      where: { id },
      relations: ['mantenimiento'],
    });

    if (!insumo) {
      throw new NotFoundException(`InsumoQuimico #${id} no encontrado`);
    }

    return insumo;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateInsumoQuimicoDto): Promise<InsumoQuimico> {
    const insumo = await this.findOne(id);

    if (dto.fechaVencimiento) {
      this.validarFechaVencimiento(dto.fechaVencimiento);
    }

    Object.assign(insumo, dto);
    return this.insumoRepository.save(insumo);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const insumo = await this.findOne(id);
    await this.insumoRepository.remove(insumo);
  }

  // ─── Lógica de negocio ───────────────────────────────────────────────────────

  private validarFechaVencimiento(fechaVencimiento: string): void {
    const hoy = new Date().toISOString().slice(0, 10);
    if (fechaVencimiento < hoy) {
      throw new BadRequestException(
        'El insumo químico está vencido y no puede ser registrado',
      );
    }
  }
}