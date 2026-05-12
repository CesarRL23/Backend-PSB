import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MantenimientoLavado, EstadoMantenimiento } from './entities/mantenimiento-lavado.entity';
import { CreateMantenimientoLavadoDto } from './dto/create-mantenimiento-lavado.dto';
import { UpdateMantenimientoLavadoDto } from './dto/update-mantenimiento-lavado.dto';

@Injectable()
export class MantenimientoLavadoService {

  constructor(
    @InjectRepository(MantenimientoLavado)
    private readonly mantenimientoRepository: Repository<MantenimientoLavado>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateMantenimientoLavadoDto): Promise<MantenimientoLavado> {
    const mantenimiento = this.mantenimientoRepository.create(dto);
    return this.mantenimientoRepository.save(mantenimiento);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<MantenimientoLavado[]> {
    return this.mantenimientoRepository.find({
      relations: ['fuenteAgua', 'registroAgua', 'insumosQuimicos'],
      order: { fechaProgramada: 'DESC' },
    });
  }

  // ─── Listar por fuente ───────────────────────────────────────────────────────

  async findByFuente(fuenteAguaId: string): Promise<MantenimientoLavado[]> {
    return this.mantenimientoRepository.find({
      where: { fuenteAguaId },
      relations: ['insumosQuimicos'],
      order: { fechaProgramada: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<MantenimientoLavado> {
    const mantenimiento = await this.mantenimientoRepository.findOne({
      where: { id },
      relations: ['fuenteAgua', 'registroAgua', 'insumosQuimicos'],
    });

    if (!mantenimiento) {
      throw new NotFoundException(`MantenimientoLavado #${id} no encontrado`);
    }

    return mantenimiento;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateMantenimientoLavadoDto): Promise<MantenimientoLavado> {
    const mantenimiento = await this.findOne(id);

    if (dto.estado) {
      this.validarTransicionEstado(mantenimiento.estado, dto.estado);
    }

    Object.assign(mantenimiento, dto);
    return this.mantenimientoRepository.save(mantenimiento);
  }

  // ─── Completar ───────────────────────────────────────────────────────────────

  async completar(id: string, observaciones?: string): Promise<MantenimientoLavado> {
    return this.update(id, {
      estado: EstadoMantenimiento.COMPLETADO,
      fechaEjecucion: new Date().toISOString().slice(0, 10),
      observaciones,
    });
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const mantenimiento = await this.findOne(id);

    if (mantenimiento.estado === EstadoMantenimiento.COMPLETADO) {
      throw new BadRequestException(
        'No se puede eliminar un mantenimiento completado',
      );
    }

    await this.mantenimientoRepository.remove(mantenimiento);
  }

  // ─── Lógica de negocio ───────────────────────────────────────────────────────

  private validarTransicionEstado(
    actual: EstadoMantenimiento,
    nuevo: EstadoMantenimiento,
  ): void {
    if (actual === nuevo) return;

    const transiciones: Record<EstadoMantenimiento, EstadoMantenimiento[]> = {
      [EstadoMantenimiento.PROGRAMADO]:  [EstadoMantenimiento.EN_PROCESO, EstadoMantenimiento.CANCELADO],
      [EstadoMantenimiento.EN_PROCESO]:  [EstadoMantenimiento.COMPLETADO, EstadoMantenimiento.CANCELADO],
      [EstadoMantenimiento.COMPLETADO]:  [],
      [EstadoMantenimiento.CANCELADO]:   [],
    };

    if (!transiciones[actual].includes(nuevo)) {
      throw new BadRequestException(
        `Transición de estado no permitida: "${actual}" → "${nuevo}"`,
      );
    }
  }
}