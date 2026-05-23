import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { CreateAnalisisLaboratorioDto } from './dto/create-analisis-laboratorio.dto';
import { UpdateAnalisisLaboratorioDto } from './dto/update-analisis-laboratorio.dto';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroService } from '../registro/registro.service';
import { RegistroAguaService } from '../registro-agua/registro-agua.service';
import { NotificationsService } from '../notifications/notifications.service';
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

const PUNTAJE_IRCA = {
  colorAparente: 6,
  turbiedad: 15,
  ph: 1.5,
  cloroResidual: 15,
  coliformesTotales: 15,
  eColi: 25,
  mesofilos: 16,
};

const PUNTAJE_MAXIMO_IRCA = 93.5;

@Injectable()
export class AnalisisLaboratorioService {

  constructor(
    @InjectRepository(AnalisisLaboratorio)
    private readonly analisisRepository: Repository<AnalisisLaboratorio>,
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
    private readonly registroService: RegistroService,
    private readonly registroAguaService: RegistroAguaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(
    dto: CreateAnalisisLaboratorioDto,
    usuarioId: string,
  ): Promise<AnalisisLaboratorio> {

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

    if (!fuenteAgua)
      throw new NotFoundException('Fuente de agua no encontrada');

    const planPsb = fuenteAgua.programaAgua?.programa?.planPsb;
    if (!planPsb)
      throw new NotFoundException('No se encontró un Plan PSB asociado a la fuente de agua');

    const nivelRiesgoEmpresa = (planPsb.nivel_riesgo ?? 'bajo').toLowerCase();
    const limites = LIMITES_POR_RIESGO[nivelRiesgoEmpresa] ?? LIMITES_POR_RIESGO.bajo;

    const cumpleFisicoquimica =
      dto.cloroResidual >= limites.cloro.min &&
      dto.cloroResidual <= limites.cloro.max &&
      dto.ph >= limites.ph.min &&
      dto.ph <= limites.ph.max &&
      dto.turbiedad <= limites.turbiedad.max &&
      dto.colorAparente <= limites.color.max;

    const cumpleMicrobiologica =
      !dto.coliformesTotalesPresentes &&
      !dto.eColiPresente;

    let puntajeIncumplido = 0;

    if (dto.colorAparente > limites.color.max)
      puntajeIncumplido += PUNTAJE_IRCA.colorAparente;
    if (dto.turbiedad > limites.turbiedad.max)
      puntajeIncumplido += PUNTAJE_IRCA.turbiedad;
    if (dto.ph < limites.ph.min || dto.ph > limites.ph.max)
      puntajeIncumplido += PUNTAJE_IRCA.ph;
    if (dto.cloroResidual < limites.cloro.min || dto.cloroResidual > limites.cloro.max)
      puntajeIncumplido += PUNTAJE_IRCA.cloroResidual;
    if (dto.coliformesTotalesPresentes)
      puntajeIncumplido += PUNTAJE_IRCA.coliformesTotales;
    if (dto.eColiPresente)
      puntajeIncumplido += PUNTAJE_IRCA.eColi;
    if ((dto.mesofilos ?? 0) > 0)
      puntajeIncumplido += PUNTAJE_IRCA.mesofilos;

    const irca = parseFloat(((puntajeIncumplido / PUNTAJE_MAXIMO_IRCA) * 100).toFixed(2));

    const nivelRiesgoCalculado =
      irca <= 5 ? 'sin_riesgo' :
      irca <= 14 ? 'riesgo_bajo' :
      irca <= 35 ? 'riesgo_medio' :
      irca <= 80 ? 'riesgo_alto' : 'inviable_sanitariamente';

    const cumpleGeneral = cumpleFisicoquimica && cumpleMicrobiologica;
    const resultado = cumpleGeneral ? 'apto' : 'no_apto';

    const programaId = fuenteAgua.programaAgua.programa.id;
    const programaAguaId = fuenteAgua.programaAgua.id;

    const registro = await this.registroService.create({
      programaId,
      usuarioId,
      fecha: new Date(dto.fechaMuestreo),
    });

    const registroAgua = await this.registroAguaService.create({
      registroId: registro.id,
      programaAguaId,
      tipoActividad: TipoActividadAgua.ANALISIS_LABORATORIO,
      resultadoGeneral: cumpleGeneral
        ? ResultadoGeneralAgua.CONFORME
        : ResultadoGeneralAgua.NO_CONFORME,
    });

    const analisis = this.analisisRepository.create({
      fuenteAguaId: dto.fuenteAguaId,
      numeroCertificado: dto.numeroCertificado,
      laboratorioCertificado: dto.laboratorioCertificado,
      fechaMuestreo: dto.fechaMuestreo,
      fechaEntregaResultado: dto.fechaEntregaResultado,
      responsableMuestra: dto.responsableMuestra,
      puntoMuestreo: dto.puntoMuestreo,
      cloroResidual: dto.cloroResidual,
      ph: dto.ph,
      turbiedad: dto.turbiedad,
      colorAparente: dto.colorAparente,
      coliformesTotalesPresentes: dto.coliformesTotalesPresentes,
      eColiPresente: dto.eColiPresente,
      mesofilos: dto.mesofilos ?? 0,
      linkDocumentoPdf: dto.linkDocumentoPdf,
      fotoEvidencia: dto.fotoEvidencia,
      registroAguaId: registroAgua.id,
      cumpleNormaFisicoquimica: cumpleFisicoquimica,
      cumpleNormaMicrobiologica: cumpleMicrobiologica,
      cumpleNormaGeneral: cumpleGeneral,
      irca,
      nivelRiesgo: nivelRiesgoCalculado,
      resultado,
    });

    const saved = await this.analisisRepository.save(analisis);

    if (!cumpleGeneral) {
      await this.notificationsService.create({
        usuario_id: usuarioId,
        tipo: 'alerta',
        titulo: 'Análisis de laboratorio no conforme',
        mensaje: `El análisis N° ${dto.numeroCertificado} del laboratorio ${dto.laboratorioCertificado} no cumple la norma. IRCA: ${irca}%. Nivel de riesgo: ${nivelRiesgoCalculado}. Se requiere acción correctiva inmediata.`,
        fecha_envio: new Date().toISOString(),
      });
    }

    return saved;
  }

  async findAll(): Promise<AnalisisLaboratorio[]> {
    return this.analisisRepository.find({
      relations: ['fuenteAgua', 'registroAgua'],
      order: { fechaMuestreo: 'DESC' },
    });
  }

  async findByFuente(fuenteAguaId: string): Promise<AnalisisLaboratorio[]> {
    return this.analisisRepository.find({
      where: { fuenteAguaId },
      order: { fechaMuestreo: 'DESC' },
    });
  }

  async findOne(id: string): Promise<AnalisisLaboratorio> {
    const analisis = await this.analisisRepository.findOne({
      where: { id },
      relations: ['fuenteAgua', 'registroAgua'],
    });

    if (!analisis)
      throw new NotFoundException(`AnalisisLaboratorio #${id} no encontrado`);

    return analisis;
  }

  async update(id: string, dto: UpdateAnalisisLaboratorioDto): Promise<AnalisisLaboratorio> {
    const analisis = await this.findOne(id);
    Object.assign(analisis, dto);
    return this.analisisRepository.save(analisis);
  }

  async remove(id: string): Promise<void> {
    const analisis = await this.findOne(id);
    await this.analisisRepository.remove(analisis);
  }
}
