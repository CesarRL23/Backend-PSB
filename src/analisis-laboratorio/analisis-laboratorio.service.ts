import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { CreateAnalisisLaboratorioDto } from './dto/create-analisis-laboratorio.dto';
import { UpdateAnalisisLaboratorioDto } from './dto/update-analisis-laboratorio.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AccionCorrectivaAguaService } from '../accion-correctiva-agua/accion-correctiva-agua.service';
import { EstadoAccionCorrectiva } from '../accion-correctiva-agua/entities/accion-correctiva-agua.entity';
import { AguaRegistroCreatorService } from '../modules/agua/shared/services/agua-registro-creator.service';
import { calcularIRCA } from '../modules/agua/shared/calculators/irca.calculator';
import { getLimites } from '../modules/agua/shared/helpers/limites-normativos.helper';
import { TipoActividadAgua, ResultadoGeneralAgua } from '../registro-agua/entities/registro-agua.entity';

@Injectable()
export class AnalisisLaboratorioService {

  constructor(
    @InjectRepository(AnalisisLaboratorio)
    private readonly analisisRepository: Repository<AnalisisLaboratorio>,
    private readonly notificationsService: NotificationsService,
    private readonly accionCorrectivaAguaService: AccionCorrectivaAguaService,
    private readonly aguaRegistroCreator: AguaRegistroCreatorService,
  ) {}

  async create(
    dto: CreateAnalisisLaboratorioDto,
    usuarioId: string,
  ): Promise<AnalisisLaboratorio> {

    if (new Date(dto.fechaMuestreo) > new Date()) {
      throw new BadRequestException('La fecha de muestreo no puede ser futura');
    }

    const nivelRiesgo = await this.aguaRegistroCreator.obtenerNivelRiesgo(dto.fuenteAguaId);
    const limites = getLimites(nivelRiesgo);

    const ircaResult = calcularIRCA({
      cloroResidual: dto.cloroResidual,
      ph: dto.ph,
      turbiedad: dto.turbiedad,
      colorAparente: dto.colorAparente,
      coliformesTotalesPresentes: dto.coliformesTotalesPresentes,
      eColiPresente: dto.eColiPresente,
      mesofilos: dto.mesofilos ?? 0,
    }, limites);

    const { registroAguaId } = await this.aguaRegistroCreator.ejecutar({
      fuenteAguaId: dto.fuenteAguaId,
      usuarioId,
      fecha: new Date(dto.fechaMuestreo),
      tipoActividad: TipoActividadAgua.ANALISIS_LABORATORIO,
      resultadoGeneral: ircaResult.cumpleGeneral
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
      registroAguaId,
      cumpleNormaFisicoquimica: ircaResult.cumpleFisicoquimica,
      cumpleNormaMicrobiologica: ircaResult.cumpleMicrobiologica,
      cumpleNormaGeneral: ircaResult.cumpleGeneral,
      irca: ircaResult.irca,
      nivelRiesgo: ircaResult.nivelRiesgo,
      resultado: ircaResult.resultado,
    });

    const saved = await this.analisisRepository.save(analisis);

    if (!ircaResult.cumpleGeneral) {
      await this.notificationsService.create({
        usuario_id: usuarioId,
        tipo: 'alerta',
        titulo: 'Análisis de laboratorio no conforme',
        mensaje: `El análisis N° ${dto.numeroCertificado} del laboratorio ${dto.laboratorioCertificado} no cumple la norma. IRCA: ${ircaResult.irca}%. Nivel de riesgo: ${ircaResult.nivelRiesgo}. Se requiere acción correctiva inmediata.`,
        fecha_envio: new Date().toISOString(),
      });

      const parametrosFueraRango: string[] = [];
      if (dto.colorAparente > limites.color.max)
        parametrosFueraRango.push('Color aparente');
      if (dto.turbiedad > limites.turbiedad.max)
        parametrosFueraRango.push('Turbiedad');
      if (dto.ph < limites.ph.min || dto.ph > limites.ph.max)
        parametrosFueraRango.push('pH');
      if (dto.cloroResidual < limites.cloro.min || dto.cloroResidual > limites.cloro.max)
        parametrosFueraRango.push('Cloro residual');
      if (dto.coliformesTotalesPresentes)
        parametrosFueraRango.push('Coliformes totales');
      if (dto.eColiPresente)
        parametrosFueraRango.push('E. coli');
      if ((dto.mesofilos ?? 0) > 0)
        parametrosFueraRango.push('Mesófilos');

      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() + 8);

      await this.accionCorrectivaAguaService.create({
        fuenteAguaId: dto.fuenteAguaId,
        descripcionDesviacion: `IRCA fuera de norma: ${ircaResult.irca}%. Nivel de riesgo: ${ircaResult.nivelRiesgo}. Parámetros: ${parametrosFueraRango.join(', ')}`,
        medidaTomada: 'Pendiente de definir por responsable',
        fecha: new Date().toISOString().split('T')[0],
        responsable: dto.responsableMuestra,
        estado: EstadoAccionCorrectiva.PENDIENTE,
        fechaLimite: fechaLimite.toISOString().split('T')[0],
        origen: 'analisis_laboratorio',
      }, usuarioId);
    }

    return saved;
  }

  async getHistoricoIrca(fuenteAguaId: string): Promise<any[]> {
    const analisis = await this.analisisRepository.find({
      where: { fuenteAguaId },
      order: { fechaMuestreo: 'ASC' },
    });

    return analisis.map((a) => ({
      id: a.id,
      fechaMuestreo: a.fechaMuestreo,
      irca: a.irca,
      nivelRiesgo: a.nivelRiesgo,
      resultado: a.resultado,
      cumpleNormaGeneral: a.cumpleNormaGeneral,
    }));
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

  async findByRegistroAgua(registroAguaId: string): Promise<AnalisisLaboratorio[]> {
    return this.analisisRepository.find({
      where: { registroAguaId },
      relations: ['fuenteAgua'],
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
