import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Registro, EstadoRegistro } from './entities/registro.entity';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Injectable()
export class RegistroService {

  constructor(
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateRegistroDto): Promise<Registro> {
    this.validarHoras(dto.horaInicio, dto.horaFin);

    const registro = this.registroRepository.create({
      ...dto,
      estado: EstadoRegistro.PENDIENTE,
    });

    return this.registroRepository.save(registro);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<Registro[]> {
    return this.registroRepository.find({
      relations: ['programa', 'usuario', 'agua', 'residuos', 'plagas', 'limpieza'],
      order: { fecha: 'DESC', createdAt: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<Registro> {
    const registro = await this.registroRepository.findOne({
      where: { id },
      relations: ['programa', 'usuario', 'agua', 'residuos', 'plagas', 'limpieza'],
    });

    if (!registro) {
      throw new NotFoundException(`Registro #${id} no encontrado`);
    }

    return registro;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateRegistroDto): Promise<Registro> {
    const registro = await this.findOne(id);

    if (dto.estado) {
      this.validarTransicionEstado(registro.estado, dto.estado);
    }

    const horaInicio = dto.horaInicio ?? registro.horaInicio;
    const horaFin    = dto.horaFin    ?? registro.horaFin;
    this.validarHoras(horaInicio, horaFin);

    Object.assign(registro, dto);
    return this.registroRepository.save(registro);
  }

  // ─── Completar (shortcut) ────────────────────────────────────────────────────

  async completar(id: string, observaciones?: string): Promise<Registro> {
    return this.update(id, {
      estado:       EstadoRegistro.COMPLETADO,
      horaFin:      new Date().toTimeString().slice(0, 8),
      observaciones,
    });
  }

  // ─── Rechazar (shortcut) ─────────────────────────────────────────────────────

  async rechazar(id: string, motivo: string): Promise<Registro> {
    if (!motivo?.trim()) {
      throw new BadRequestException('Debe indicar el motivo del rechazo');
    }

    return this.update(id, {
      estado:       EstadoRegistro.RECHAZADO,
      observaciones: motivo,
    });
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const registro = await this.findOne(id);

    if (registro.estado === EstadoRegistro.COMPLETADO) {
      throw new BadRequestException(
        'No se puede eliminar un registro ya completado',
      );
    }

    await this.registroRepository.remove(registro);
  }

  // ─── Lógica de negocio ───────────────────────────────────────────────────────

  private validarHoras(horaInicio?: string, horaFin?: string): void {
    if (!horaInicio || !horaFin) return;

    if (horaFin <= horaInicio) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la hora de inicio',
      );
    }
  }

  /**
   * Flujo permitido:
   *   PENDIENTE → EN_PROCESO → COMPLETADO
   *                          → RECHAZADO
   *   PENDIENTE → RECHAZADO
   */
  private validarTransicionEstado(
    actual:  EstadoRegistro,
    nuevo:   EstadoRegistro,
  ): void {
    if (actual === nuevo) return;

    const transiciones: Record<EstadoRegistro, EstadoRegistro[]> = {
      [EstadoRegistro.PENDIENTE]:  [EstadoRegistro.EN_PROCESO,  EstadoRegistro.RECHAZADO],
      [EstadoRegistro.EN_PROCESO]: [EstadoRegistro.COMPLETADO,  EstadoRegistro.RECHAZADO],
      [EstadoRegistro.COMPLETADO]: [],
      [EstadoRegistro.RECHAZADO]:  [],
    };

    if (!transiciones[actual].includes(nuevo)) {
      throw new BadRequestException(
        `Transición de estado no permitida: "${actual}" → "${nuevo}"`,
      );
    }
  }
}