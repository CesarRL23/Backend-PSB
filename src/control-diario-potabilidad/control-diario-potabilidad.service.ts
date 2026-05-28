import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { CreateControlDiarioPotabilidadDto } from './dto/create-control-diario-potabilidad.dto';
import { UpdateControlDiarioPotabilidadDto } from './dto/update-control-diario-potabilidad.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';
import {
  calcularCumpleNorma,
  parametroFueraRangoToString,
} from '../modules/agua/shared/calculators/cumple-norma.calculator';
import { getLimites } from '../modules/agua/shared/helpers/limites-normativos.helper';
import { TipoActividadAgua, ResultadoGeneralAgua } from '../registro-agua/entities/registro-agua.entity';

@Injectable()
export class ControlDiarioPotabilidadService {

  constructor(
    @InjectRepository(ControlDiarioPotabilidad)
    private readonly controlRepository: Repository<ControlDiarioPotabilidad>,
    private readonly notificationsService: NotificationsService,
    private readonly aguaRegistroCreator: AguaRegistroCreatorService,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(
    dto: CreateControlDiarioPotabilidadDto,
    usuarioId: string,
  ): Promise<ControlDiarioPotabilidad> {

    if (new Date(dto.fechaHora) > new Date()) {
      throw new BadRequestException('La fecha y hora del control no puede ser futura');
    }

    const nivelRiesgo = await this.aguaRegistroCreator.obtenerNivelRiesgo(dto.fuenteAguaId);
    const limites = getLimites(nivelRiesgo);

    const { cumple, fueraDeRango } = calcularCumpleNorma({
      cloroResidual: dto.cloroResidual,
      ph: dto.ph,
      turbiedad: dto.turbiedad,
      colorAparente: dto.colorAparente,
    }, limites);

    const cumpleNorma = cumple;
    const parametroFueraRango = parametroFueraRangoToString(fueraDeRango);
    const requiereAnalisisLaboratorio = !cumpleNorma;

    const { registroAguaId } = await this.aguaRegistroCreator.ejecutar({
      fuenteAguaId: dto.fuenteAguaId,
      usuarioId,
      fecha: new Date(dto.fechaHora),
      tipoActividad: TipoActividadAgua.CONTROL_POTABILIDAD,
      resultadoGeneral: cumpleNorma
        ? ResultadoGeneralAgua.CONFORME
        : ResultadoGeneralAgua.NO_CONFORME,
    });

    const datosControl = {
      ...dto,
      registroAguaId,
      cumpleNorma,
      requiereAnalisisLaboratorio,
      parametroFueraRango: parametroFueraRango ?? undefined,
    };

    const control = this.controlRepository.create(datosControl);
    const saved = await this.controlRepository.save(control);

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

  async findAll(): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      relations: ['fuenteAgua', 'registroAgua'],
      order: { fechaHora: 'DESC' },
    });
  }

  async findByFuente(fuenteAguaId: string): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      where: { fuenteAguaId },
      order: { fechaHora: 'DESC' },
    });
  }

  async findByRegistroAgua(registroAguaId: string): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      where: { registroAguaId },
      relations: ['fuenteAgua'],
      order: { fechaHora: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ControlDiarioPotabilidad> {
    const control = await this.controlRepository.findOne({
      where: { id },
      relations: ['fuenteAgua', 'registroAgua'],
    });
    if (!control)
      throw new NotFoundException(`ControlDiarioPotabilidad #${id} no encontrado`);
    return control;
  }

  async update(id: string, dto: UpdateControlDiarioPotabilidadDto): Promise<ControlDiarioPotabilidad> {
    const control = await this.findOne(id);
    Object.assign(control, dto);
    return this.controlRepository.save(control);
  }

  async remove(id: string): Promise<void> {
    const control = await this.findOne(id);
    await this.controlRepository.remove(control);
  }
}
