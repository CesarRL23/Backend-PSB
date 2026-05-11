import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccionCorrectivaAgua, EstadoAccionCorrectiva } from './entities/accion-correctiva-agua.entity';
import { CreateAccionCorrectivaAguaDto } from './dto/create-accion-correctiva-agua.dto';
import { UpdateAccionCorrectivaAguaDto } from './dto/update-accion-correctiva-agua.dto';

@Injectable()
export class AccionCorrectivaAguaService {

  constructor(
    @InjectRepository(AccionCorrectivaAgua)
    private readonly accionRepository: Repository<AccionCorrectivaAgua>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateAccionCorrectivaAguaDto): Promise<AccionCorrectivaAgua> {
    const accion = this.accionRepository.create(dto);
    return this.accionRepository.save(accion);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<AccionCorrectivaAgua[]> {
    return this.accionRepository.find({
      relations: ['registroAgua'],
      order: { fecha: 'DESC' },
    });
  }

  // ─── Listar por registro agua ─────────────────────────────────────────────────

  async findByRegistroAgua(registroAguaId: string): Promise<AccionCorrectivaAgua[]> {
    return this.accionRepository.find({
      where: { registroAguaId },
      order: { fecha: 'DESC' },
    });
  }

  // ─── Listar pendientes ───────────────────────────────────────────────────────

  async findPendientes(): Promise<AccionCorrectivaAgua[]> {
    return this.accionRepository.find({
      where: { estado: EstadoAccionCorrectiva.PENDIENTE },
      relations: ['registroAgua'],
      order: { fecha: 'ASC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<AccionCorrectivaAgua> {
    const accion = await this.accionRepository.findOne({
      where: { id },
      relations: ['registroAgua'],
    });

    if (!accion) {
      throw new NotFoundException(`AccionCorrectivaAgua #${id} no encontrada`);
    }

    return accion;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateAccionCorrectivaAguaDto): Promise<AccionCorrectivaAgua> {
    const accion = await this.findOne(id);

    if (dto.estado) {
      this.validarTransicionEstado(accion.estado, dto.estado);
    }

    Object.assign(accion, dto);
    return this.accionRepository.save(accion);
  }

  // ─── Completar ───────────────────────────────────────────────────────────────

  async completar(id: string, resultadoVerificacion: string): Promise<AccionCorrectivaAgua> {
    if (!resultadoVerificacion?.trim()) {
      throw new BadRequestException(
        'Debe indicar el resultado de la verificación para completar la acción',
      );
    }

    return this.update(id, {
      estado: EstadoAccionCorrectiva.COMPLETADA,
      resultadoVerificacion,
    });
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const accion = await this.findOne(id);

    if (accion.estado === EstadoAccionCorrectiva.COMPLETADA) {
      throw new BadRequestException(
        'No se puede eliminar una acción correctiva ya completada',
      );
    }

    await this.accionRepository.remove(accion);
  }

  // ─── Lógica de negocio ───────────────────────────────────────────────────────

  private validarTransicionEstado(
    actual: EstadoAccionCorrectiva,
    nuevo: EstadoAccionCorrectiva,
  ): void {
    if (actual === nuevo) return;

    const transiciones: Record<EstadoAccionCorrectiva, EstadoAccionCorrectiva[]> = {
      [EstadoAccionCorrectiva.PENDIENTE]:  [EstadoAccionCorrectiva.EN_PROCESO, EstadoAccionCorrectiva.CANCELADA],
      [EstadoAccionCorrectiva.EN_PROCESO]: [EstadoAccionCorrectiva.COMPLETADA, EstadoAccionCorrectiva.CANCELADA],
      [EstadoAccionCorrectiva.COMPLETADA]: [],
      [EstadoAccionCorrectiva.CANCELADA]:  [],
    };

    if (!transiciones[actual].includes(nuevo)) {
      throw new BadRequestException(
        `Transición de estado no permitida: "${actual}" → "${nuevo}"`,
      );
    }
  }
}