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
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';
import { NotificationsService } from '../notifications/notifications.service';
import { validarAccionCorrectiva } from '../modules/agua/shared/validators';
import { TipoActividadAgua } from '../registro-agua/entities/registro-agua.entity';

@Injectable()
export class AccionCorrectivaAguaService {

  constructor(
    @InjectRepository(AccionCorrectivaAgua)
    private readonly accionRepository: Repository<AccionCorrectivaAgua>,
    private readonly notificationsService: NotificationsService,
    private readonly aguaRegistroCreator: AguaRegistroCreatorService,
  ) {}

  async create(
    dto: CreateAccionCorrectivaAguaDto,
    usuarioId: string,
  ): Promise<AccionCorrectivaAgua> {

    validarAccionCorrectiva({
      estado: dto.estado ?? EstadoAccionCorrectiva.PENDIENTE,
      resultadoVerificacion: dto.resultadoVerificacion,
      descripcionDesviacion: dto.descripcionDesviacion,
    });

    const { registroAguaId } = await this.aguaRegistroCreator.ejecutar({
      fuenteAguaId: dto.fuenteAguaId,
      usuarioId,
      fecha: new Date(dto.fecha),
      tipoActividad: TipoActividadAgua.ACCION_CORRECTIVA,
    });

    const accion = this.accionRepository.create({
      ...dto,
      registroAguaId,
    });

    const saved = await this.accionRepository.save(accion);

    const hoy = new Date();
    const estadoFinal = dto.estado ?? EstadoAccionCorrectiva.PENDIENTE;

    if (
      dto.fechaLimite &&
      new Date(dto.fechaLimite) < hoy &&
      [EstadoAccionCorrectiva.PENDIENTE, EstadoAccionCorrectiva.EN_PROCESO].includes(estadoFinal)
    ) {
      await this.notificationsService.create({
        usuario_id: usuarioId,
        tipo: 'alerta',
        titulo: 'Acción correctiva vencida',
        mensaje: `La acción correctiva del ${dto.fecha} ha superado su fecha límite (${dto.fechaLimite}) y sigue en estado ${estadoFinal}. Se requiere atención inmediata.`,
        fecha_envio: hoy.toISOString(),
      });
    }

    return saved;
  }

  async findAll(): Promise<AccionCorrectivaAgua[]> {
    return this.accionRepository.find({
      relations: ['registroAgua'],
      order: { fecha: 'DESC' },
    });
  }

  async findByRegistroAgua(registroAguaId: string): Promise<AccionCorrectivaAgua[]> {
    return this.accionRepository.find({
      where: { registroAguaId },
      order: { fecha: 'DESC' },
    });
  }

  async findPendientes(): Promise<AccionCorrectivaAgua[]> {
    return this.accionRepository.find({
      where: { estado: EstadoAccionCorrectiva.PENDIENTE },
      relations: ['registroAgua'],
      order: { fecha: 'ASC' },
    });
  }

  async findOne(id: string): Promise<AccionCorrectivaAgua> {
    const accion = await this.accionRepository.findOne({
      where: { id },
      relations: ['registroAgua'],
    });

    if (!accion)
      throw new NotFoundException(`AccionCorrectivaAgua #${id} no encontrada`);

    return accion;
  }

  async update(id: string, dto: UpdateAccionCorrectivaAguaDto): Promise<AccionCorrectivaAgua> {
    const accion = await this.findOne(id);

    if (dto.estado) {
      this.validarTransicionEstado(accion.estado, dto.estado);
    }

    const nuevoEstado = dto.estado ?? accion.estado;
    const nuevoResultado = dto.resultadoVerificacion ?? accion.resultadoVerificacion;

    validarAccionCorrectiva({
      estado: nuevoEstado,
      resultadoVerificacion: nuevoResultado,
      descripcionDesviacion: dto.descripcionDesviacion ?? accion.descripcionDesviacion,
    });

    Object.assign(accion, dto);
    return this.accionRepository.save(accion);
  }

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

  async remove(id: string): Promise<void> {
    const accion = await this.findOne(id);

    if (accion.estado === EstadoAccionCorrectiva.COMPLETADA) {
      throw new BadRequestException(
        'No se puede eliminar una acción correctiva ya completada',
      );
    }

    await this.accionRepository.remove(accion);
  }

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
