import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuenteAgua } from '../../../../fuente-agua/entities/fuente-agua.entity';
import { RegistroService } from '../../../../registro/registro.service';
import { RegistroAguaService } from '../../../../registro-agua/registro-agua.service';
import { TipoActividadAgua, ResultadoGeneralAgua } from '../../../../registro-agua/entities/registro-agua.entity';
import { UserResolverService } from '../../../../common/services/user-resolver.service';

export interface CrearRegistrosInput {
  fuenteAguaId: string;
  usuarioId: string;
  fecha: Date;
  tipoActividad: TipoActividadAgua;
  resultadoGeneral?: ResultadoGeneralAgua;
}

export interface CrearRegistrosOutput {
  registroAguaId: string;
  programaId: string;
  programaAguaId: string;
}

@Injectable()
export class AguaRegistroCreatorService {
  constructor(
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
    private readonly registroService: RegistroService,
    private readonly registroAguaService: RegistroAguaService,
    private readonly userResolver: UserResolverService,
  ) {}

  async ejecutar(input: CrearRegistrosInput): Promise<CrearRegistrosOutput> {
    const usuarioId = await this.userResolver.resolve(input.usuarioId);
    const fuenteAgua = await this.fuenteAguaRepository.findOne({
      where: { id: input.fuenteAguaId },
      relations: {
        programaAgua: {
          programa: true,
        },
      },
    });

    if (!fuenteAgua) {
      throw new NotFoundException('Fuente de agua no encontrada');
    }

    const programaAgua = fuenteAgua.programaAgua;
    if (!programaAgua) {
      throw new NotFoundException(
        'No se encontró un programa de agua asociado a la fuente',
      );
    }

    const programaId = programaAgua.programa.id;
    const programaAguaId = programaAgua.id;

    const registro = await this.registroService.create({
      programaId,
      usuarioId,
      fecha: input.fecha,
    });

    const registroAgua = await this.registroAguaService.create({
      registroId: registro.id,
      programaAguaId,
      tipoActividad: input.tipoActividad,
      resultadoGeneral: input.resultadoGeneral ?? ResultadoGeneralAgua.EN_PROCESO,
    });

    return {
      registroAguaId: registroAgua.id,
      programaId,
      programaAguaId,
    };
  }

  async obtenerNivelRiesgo(fuenteAguaId: string): Promise<string> {
    const fuenteAgua = await this.fuenteAguaRepository.findOne({
      where: { id: fuenteAguaId },
      relations: {
        programaAgua: {
          programa: {
            planPsb: true,
          },
        },
      },
    });

    return fuenteAgua?.programaAgua?.programa?.planPsb?.nivel_riesgo ?? 'bajo';
  }
}
