import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VerificacionLimpieza } from './entities/verificacion-limpieza.entity';
import { CreateVerificacionLimpiezaDto } from './dto/create-verificacion-limpieza.dto';
import { UpdateVerificacionLimpiezaDto } from './dto/update-verificacion-limpieza.dto';

const METODOS_CON_REACTIVO = ['ATP', 'ALERGENOS'];

@Injectable()
export class VerificacionLimpiezaService {

  constructor(
    @InjectRepository(VerificacionLimpieza)
    private readonly repo: Repository<VerificacionLimpieza>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateVerificacionLimpiezaDto): Promise<VerificacionLimpieza> {
    this.validarReactivo(dto.metodoValidacion, dto.fechaVencimientoReactivo);
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar por registro de limpieza ─────────────────────────────────────────

  async findByRegistroLimpieza(registroLimpiezaId: string): Promise<VerificacionLimpieza[]> {
    return this.repo.find({
      where: { registroLimpiezaId },
      relations: ['responsable'],
      order: { fechaPrueba: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<VerificacionLimpieza> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['registroLimpieza', 'responsable'],
    });

    if (!entity) {
      throw new NotFoundException(`VerificacionLimpieza #${id} no encontrada`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateVerificacionLimpiezaDto): Promise<VerificacionLimpieza> {
    const entity = await this.findOne(id);

    const metodo = dto.metodoValidacion ?? entity.metodoValidacion;
    const fechaVenc = dto.fechaVencimientoReactivo ?? entity.fechaVencimientoReactivo;
    this.validarReactivo(metodo, fechaVenc);

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }

  // ─── Lógica de negocio ───────────────────────────────────────────────────────

  private validarReactivo(metodo?: string, fechaVencimiento?: string): void {
    if (!metodo || !METODOS_CON_REACTIVO.includes(metodo.toUpperCase())) return;

    if (!fechaVencimiento) {
      throw new BadRequestException(
        `El método "${metodo}" requiere informar la fecha de vencimiento del reactivo`,
      );
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const vencimiento = new Date(fechaVencimiento);

    if (vencimiento < hoy) {
      throw new BadRequestException(
        `El reactivo venció el ${fechaVencimiento}. No se puede registrar una verificación con reactivo vencido`,
      );
    }
  }
}
