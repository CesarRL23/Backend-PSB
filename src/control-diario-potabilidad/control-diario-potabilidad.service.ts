import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { CreateControlDiarioPotabilidadDto } from './dto/create-control-diario-potabilidad.dto';
import { UpdateControlDiarioPotabilidadDto } from './dto/update-control-diario-potabilidad.dto';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { RegistroService } from '../registro/registro.service';
import { RegistroAguaService } from '../registro-agua/registro-agua.service';
import { TipoActividadAgua, ResultadoGeneralAgua } from '../registro-agua/entities/registro-agua.entity';

type LimitesPotabilidad = {
  cloro: { min: number; max: number };
  ph: { min: number; max: number };
  turbiedad: { max: number };
  color: { max: number };
};

const LIMITES_POR_RIESGO: Record<string, LimitesPotabilidad> = {
  alto: {
    cloro: { min: 0.3, max: 0.5 },
    ph: { min: 6.5, max: 7.5 },
    turbiedad: { max: 1 },
    color: { max: 5 },
  },
  medio: {
    cloro: { min: 0.3, max: 1.0 },
    ph: { min: 6.5, max: 8.5 },
    turbiedad: { max: 2 },
    color: { max: 15 },
  },
  bajo: {
    cloro: { min: 0.3, max: 2.0 },
    ph: { min: 6.5, max: 9.0 },
    turbiedad: { max: 2 },
    color: { max: 15 },
  },
};

@Injectable()
export class ControlDiarioPotabilidadService {

  constructor(
    @InjectRepository(ControlDiarioPotabilidad)
    private readonly controlRepository: Repository<ControlDiarioPotabilidad>,
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
    private readonly notificationsService: NotificationsService,
    private readonly registroService: RegistroService,
    private readonly registroAguaService: RegistroAguaService,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(
    dto: CreateControlDiarioPotabilidadDto,
    usuarioId: string,
  ): Promise<ControlDiarioPotabilidad> {

    // 1. Obtener nivel de riesgo desde la cadena de relaciones
    const fuenteAgua = await this.fuenteAguaRepository.findOne({
      where: { id: dto.fuenteAguaId },
      relations: {
        programaAgua: {
          programa: {
            planPsb: true,
          },
        },
      },
    });

    if (!fuenteAgua) {
      throw new NotFoundException('Fuente de agua no encontrada');
    }

    const planPsb = fuenteAgua.programaAgua?.programa?.planPsb;

    if (!planPsb) {
      throw new NotFoundException('No se encontró un Plan PSB asociado a la fuente de agua');
    }

    const nivelRiesgo = (planPsb.nivel_riesgo ?? 'bajo').toLowerCase();

    // 2. Obtener límites según nivel de riesgo
    const limites = LIMITES_POR_RIESGO[nivelRiesgo] ?? LIMITES_POR_RIESGO.bajo;

    // 3. Validar parámetros y recolectar los que están fuera de rango
    const fueraDeRango: string[] = [];

    if (dto.cloroResidual < limites.cloro.min || dto.cloroResidual > limites.cloro.max) {
      fueraDeRango.push('cloro_residual');
    }

    if (dto.ph < limites.ph.min || dto.ph > limites.ph.max) {
      fueraDeRango.push('ph');
    }

    if (dto.turbiedad > limites.turbiedad.max) {
      fueraDeRango.push('turbiedad');
    }

    if (dto.colorAparente > limites.color.max) {
      fueraDeRango.push('color_aparente');
    }

    // 4. Calcular campos automáticos
    const cumpleNorma = fueraDeRango.length === 0;
    const parametroFueraRango = fueraDeRango.length > 0 ? fueraDeRango.join(', ') : null;
    const requiereAnalisisLaboratorio = !cumpleNorma;

    // 5. Obtener ids para Registro y RegistroAgua
    const programaId = fuenteAgua.programaAgua.programa.id;
    const programaAguaId = fuenteAgua.programaAgua.id;

    // 6. Auto-crear Registro y RegistroAgua
    const registro = await this.registroService.create({
      programaId,
      usuarioId,
      fecha: new Date(dto.fechaHora),
    });

    const registroAgua = await this.registroAguaService.create({
      registroId: registro.id,
      programaAguaId,
      tipoActividad: TipoActividadAgua.CONTROL_POTABILIDAD,
      resultadoGeneral: cumpleNorma
        ? ResultadoGeneralAgua.CONFORME
        : ResultadoGeneralAgua.NO_CONFORME,
    });

    // 7. Crear y guardar el control
    const datosControl = {
      ...dto,
      registroAguaId: registroAgua.id,
      cumpleNorma,
      requiereAnalisisLaboratorio,
      parametroFueraRango: parametroFueraRango ?? undefined,
    };

    const control = this.controlRepository.create(datosControl);
    const saved = await this.controlRepository.save(control);

    // 8. Crear notificación si se requiere análisis de laboratorio
    if (requiereAnalisisLaboratorio) {
      await this.notificationsService.create({
        usuario_id: usuarioId,
        tipo: 'alerta',
        titulo: 'Análisis de laboratorio requerido',
        mensaje: `Parámetros fuera de rango: ${parametroFueraRango}. Se requiere análisis de laboratorio inmediato.`,
        fecha_envio: new Date().toISOString(),
      });
    }

    return saved;
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      relations: ['fuenteAgua', 'registroAgua'],
      order: { fechaHora: 'DESC' },
    });
  }

  // ─── Listar por fuente ───────────────────────────────────────────────────────

  async findByFuente(fuenteAguaId: string): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      where: { fuenteAguaId },
      order: { fechaHora: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<ControlDiarioPotabilidad> {
    const control = await this.controlRepository.findOne({
      where: { id },
      relations: ['fuenteAgua', 'registroAgua'],
    });

    if (!control) {
      throw new NotFoundException(`ControlDiarioPotabilidad #${id} no encontrado`);
    }

    return control;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateControlDiarioPotabilidadDto): Promise<ControlDiarioPotabilidad> {
    const control = await this.findOne(id);
    Object.assign(control, dto);
    return this.controlRepository.save(control);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const control = await this.findOne(id);
    await this.controlRepository.remove(control);
  }
}
