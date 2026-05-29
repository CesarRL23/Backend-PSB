import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

import { MantenimientoLavado, EstadoMantenimiento } from './entities/mantenimiento-lavado.entity';
import { CreateMantenimientoLavadoDto } from './dto/create-mantenimiento-lavado.dto';
import { UpdateMantenimientoLavadoDto } from './dto/update-mantenimiento-lavado.dto';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';
import { NotificationsService } from '../notifications/notifications.service';
import { validarMantenimiento } from '../modules/agua/shared/validators';
import { TipoActividadAgua } from '../registro-agua/entities/registro-agua.entity';

@Injectable()
export class MantenimientoLavadoService {

  constructor(
    @InjectRepository(MantenimientoLavado)
    private readonly mantenimientoRepository: Repository<MantenimientoLavado>,
    private readonly notificationsService: NotificationsService,
    private readonly aguaRegistroCreator: AguaRegistroCreatorService,
  ) {}

  async create(
    dto: CreateMantenimientoLavadoDto,
    usuarioId: string,
  ): Promise<MantenimientoLavado> {

    validarMantenimiento({
      estado: dto.estado ?? EstadoMantenimiento.PROGRAMADO,
      fechaEjecucion: dto.fechaEjecucion,
      fechaProgramada: dto.fechaProgramada,
    });

    if (new Date(dto.fechaProgramada) < new Date()) {
      throw new BadRequestException('La fecha programada no puede ser anterior a hoy');
    }

    const { registroAguaId } = await this.aguaRegistroCreator.ejecutar({
      fuenteAguaId: dto.fuenteAguaId,
      usuarioId,
      fecha: new Date(dto.fechaProgramada),
      tipoActividad: TipoActividadAgua.MANTENIMIENTO_LAVADO,
    });

    const mantenimiento = this.mantenimientoRepository.create({
      ...dto,
      registroAguaId,
    });

    const saved = await this.mantenimientoRepository.save(mantenimiento);

    const hoy = new Date();
    if (
      new Date(dto.fechaProgramada) < hoy &&
      (dto.estado ?? EstadoMantenimiento.PROGRAMADO) === EstadoMantenimiento.PROGRAMADO
    ) {
      await this.notificationsService.create({
        usuario_id: usuarioId,
        tipo: 'alerta',
        titulo: 'Mantenimiento no ejecutado',
        mensaje: `El mantenimiento programado para ${dto.fechaProgramada} no ha sido ejecutado. Estado actual: ${dto.estado ?? EstadoMantenimiento.PROGRAMADO}.`,
        fecha_envio: hoy.toISOString(),
      });
    }

    return saved;
  }

  async findAll(): Promise<MantenimientoLavado[]> {
    return this.mantenimientoRepository.find({
      relations: ['fuenteAgua', 'registroAgua', 'insumosQuimicos'],
      order: { fechaProgramada: 'DESC' },
    });
  }

  async findByFuente(fuenteAguaId: string): Promise<MantenimientoLavado[]> {
    return this.mantenimientoRepository.find({
      where: { fuenteAguaId },
      relations: ['insumosQuimicos'],
      order: { fechaProgramada: 'DESC' },
    });
  }

  async findByRegistroAgua(registroAguaId: string): Promise<MantenimientoLavado[]> {
    return this.mantenimientoRepository.find({
      where: { registroAguaId },
      relations: ['fuenteAgua', 'insumosQuimicos'],
      order: { fechaProgramada: 'DESC' },
    });
  }

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

  async update(id: string, dto: UpdateMantenimientoLavadoDto): Promise<MantenimientoLavado> {
    const mantenimiento = await this.findOne(id);

    if (dto.estado) {
      this.validarTransicionEstado(mantenimiento.estado, dto.estado);
    }

    const nuevoEstado = dto.estado ?? mantenimiento.estado;
    const nuevaFechaEjec = dto.fechaEjecucion ?? mantenimiento.fechaEjecucion;

    validarMantenimiento({
      estado: nuevoEstado,
      fechaEjecucion: nuevaFechaEjec,
      fechaProgramada: dto.fechaProgramada ?? mantenimiento.fechaProgramada,
    });

    Object.assign(mantenimiento, dto);
    return this.mantenimientoRepository.save(mantenimiento);
  }

  async completar(id: string, fechaEjecucion?: string, observaciones?: string): Promise<MantenimientoLavado> {
    const fecha = fechaEjecucion ?? new Date().toISOString().slice(0, 10);

    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);
    if (new Date(fecha) > hoy) {
      throw new BadRequestException('La fecha de ejecución no puede ser una fecha futura');
    }

    return this.update(id, {
      estado: EstadoMantenimiento.COMPLETADO,
      fechaEjecucion: fecha,
      observaciones,
    });
  }

  async remove(id: string): Promise<void> {
    const mantenimiento = await this.findOne(id);

    if (mantenimiento.estado === EstadoMantenimiento.COMPLETADO) {
      throw new BadRequestException(
        'No se puede eliminar un mantenimiento completado',
      );
    }

    try {
      await this.mantenimientoRepository.remove(mantenimiento);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).driverError?.code === '23503') {
        throw new ConflictException(
          'No se puede eliminar el mantenimiento porque tiene insumos químicos asociados.',
        );
      }
      throw error;
    }
  }

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
