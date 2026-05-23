import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccionCorrectivaAgua, EstadoAccionCorrectiva } from './entities/accion-correctiva-agua.entity';
import { CreateAccionCorrectivaAguaDto } from './dto/create-accion-correctiva-agua.dto';
import { UpdateAccionCorrectivaAguaDto } from './dto/update-accion-correctiva-agua.dto';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroService } from '../registro/registro.service';
import { RegistroAguaService } from '../registro-agua/registro-agua.service';
import { TipoActividadAgua, ResultadoGeneralAgua } from '../registro-agua/entities/registro-agua.entity';

@Injectable()
export class AccionCorrectivaAguaService {

  constructor(
    @InjectRepository(AccionCorrectivaAgua)
    private readonly accionRepository: Repository<AccionCorrectivaAgua>,
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
    private readonly registroService: RegistroService,
    private readonly registroAguaService: RegistroAguaService,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(
    dto: CreateAccionCorrectivaAguaDto,
    usuarioId: string,
  ): Promise<AccionCorrectivaAgua> {
    const fuenteAgua = await this.fuenteAguaRepository.findOne({
      where: { id: dto.fuenteAguaId },
      relations: {
        programaAgua: {
          programa: true,
        },
      },
    });

    if (!fuenteAgua)
      throw new NotFoundException('Fuente de agua no encontrada');

    const programaAgua = fuenteAgua.programaAgua;
    if (!programaAgua)
      throw new NotFoundException('No se encontró un programa de agua asociado a la fuente');

    const programaId = programaAgua.programa.id;
    const programaAguaId = programaAgua.id;

    const registro = await this.registroService.create({
      programaId,
      usuarioId,
      fecha: new Date(dto.fecha),
    });

    const registroAgua = await this.registroAguaService.create({
      registroId: registro.id,
      programaAguaId,
      tipoActividad: TipoActividadAgua.ACCION_CORRECTIVA,
      resultadoGeneral: ResultadoGeneralAgua.EN_PROCESO,
    });

    const accion = this.accionRepository.create({
      ...dto,
      registroAguaId: registroAgua.id,
    });

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

    if (!accion)
      throw new NotFoundException(`AccionCorrectivaAgua #${id} no encontrada`);

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
