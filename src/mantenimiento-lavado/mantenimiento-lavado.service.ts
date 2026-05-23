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
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroService } from '../registro/registro.service';
import { RegistroAguaService } from '../registro-agua/registro-agua.service';
import { TipoActividadAgua, ResultadoGeneralAgua } from '../registro-agua/entities/registro-agua.entity';

@Injectable()
export class MantenimientoLavadoService {

  constructor(
    @InjectRepository(MantenimientoLavado)
    private readonly mantenimientoRepository: Repository<MantenimientoLavado>,
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
    private readonly registroService: RegistroService,
    private readonly registroAguaService: RegistroAguaService,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(
    dto: CreateMantenimientoLavadoDto,
    usuarioId: string,
  ): Promise<MantenimientoLavado> {
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
      fecha: new Date(dto.fechaProgramada),
    });

    const registroAgua = await this.registroAguaService.create({
      registroId: registro.id,
      programaAguaId,
      tipoActividad: TipoActividadAgua.MANTENIMIENTO_LAVADO,
      resultadoGeneral: ResultadoGeneralAgua.EN_PROCESO,
    });

    const mantenimiento = this.mantenimientoRepository.create({
      ...dto,
      registroAguaId: registroAgua.id,
    });

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
