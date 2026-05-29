import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { FuenteAgua } from './entities/fuente-agua.entity';
import { CreateFuenteAguaDto } from './dto/create-fuente-agua.dto';
import { UpdateFuenteAguaDto } from './dto/update-fuente-agua.dto';
import { ControlDiarioPotabilidad } from '../control-diario-potabilidad/entities/control-diario-potabilidad.entity';
import { AnalisisLaboratorio } from '../analisis-laboratorio/entities/analisis-laboratorio.entity';
import { MantenimientoLavado } from '../mantenimiento-lavado/entities/mantenimiento-lavado.entity';
import { AccionCorrectivaAgua, EstadoAccionCorrectiva } from '../accion-correctiva-agua/entities/accion-correctiva-agua.entity';
import { validarFuenteAgua } from '../modules/agua/shared/validators';

@Injectable()
export class FuenteAguaService {

  constructor(
    @InjectRepository(FuenteAgua)
    private readonly fuenteAguaRepository: Repository<FuenteAgua>,
    @InjectRepository(ControlDiarioPotabilidad)
    private readonly controlRepository: Repository<ControlDiarioPotabilidad>,
    @InjectRepository(AnalisisLaboratorio)
    private readonly analisisRepository: Repository<AnalisisLaboratorio>,
    @InjectRepository(MantenimientoLavado)
    private readonly mantenimientoRepository: Repository<MantenimientoLavado>,
    @InjectRepository(AccionCorrectivaAgua)
    private readonly accionRepository: Repository<AccionCorrectivaAgua>,
  ) {}

  async getResumen(id: string): Promise<any> {
    const fuente = await this.findOne(id);

    const [ultimoControl] = await this.controlRepository.find({
      where: { fuenteAguaId: id },
      order: { fechaHora: 'DESC' },
      take: 1,
    });

    const [ultimoAnalisis] = await this.analisisRepository.find({
      where: { fuenteAguaId: id },
      order: { fechaMuestreo: 'DESC' },
      take: 1,
    });

    const [ultimoMantenimiento] = await this.mantenimientoRepository.find({
      where: { fuenteAguaId: id },
      order: { fechaProgramada: 'DESC' },
      take: 1,
    });

    const accionesPendientes = await this.accionRepository.count({
      where: {
        fuenteAguaId: id,
        estado: In([EstadoAccionCorrectiva.PENDIENTE, EstadoAccionCorrectiva.EN_PROCESO]),
      },
    });

    const cumpleNorma =
      (ultimoControl?.cumpleNorma ?? true) &&
      (ultimoAnalisis?.cumpleNormaGeneral ?? true);

    return {
      fuente,
      ultimoControl: ultimoControl ?? null,
      ultimoAnalisis: ultimoAnalisis ?? null,
      ultimoMantenimiento: ultimoMantenimiento ?? null,
      accionesPendientes,
      cumpleNorma,
    };
  }

  async create(dto: CreateFuenteAguaDto): Promise<FuenteAgua> {
    validarFuenteAgua({ tipo: dto.tipo, proveedor: dto.proveedor });
    const fuenteAgua = this.fuenteAguaRepository.create(dto);
    return this.fuenteAguaRepository.save(fuenteAgua);
  }

  async findAll(): Promise<FuenteAgua[]> {
    return this.fuenteAguaRepository.find({
      relations: [
        'programaAgua',
        'tanqueAlmacenamiento',
        'controlesDiarios',
        'analisisLaboratorio',
        'mantenimientos',
      ],
    });
  }

  async findByProgramaAgua(programaAguaId: string): Promise<FuenteAgua[]> {
    return this.fuenteAguaRepository.find({
      where: { programaAguaId },
      relations: [
        'tanqueAlmacenamiento',
        'controlesDiarios',
        'analisisLaboratorio',
        'mantenimientos',
      ],
    });
  }

  async findOne(id: string): Promise<FuenteAgua> {
    const fuenteAgua = await this.fuenteAguaRepository.findOne({
      where: { id },
      relations: [
        'programaAgua',
        'tanqueAlmacenamiento',
        'controlesDiarios',
        'analisisLaboratorio',
        'mantenimientos',
      ],
    });

    if (!fuenteAgua) {
      throw new NotFoundException(`FuenteAgua #${id} no encontrada`);
    }

    return fuenteAgua;
  }

  async update(id: string, dto: UpdateFuenteAguaDto): Promise<FuenteAgua> {
    const fuenteAgua = await this.findOne(id);
    const tipo = dto.tipo ?? fuenteAgua.tipo;
    const proveedor = dto.proveedor ?? fuenteAgua.proveedor;
    validarFuenteAgua({ tipo, proveedor });
    Object.assign(fuenteAgua, dto);
    return this.fuenteAguaRepository.save(fuenteAgua);
  }

  async remove(id: string): Promise<void> {
    const fuenteAgua = await this.findOne(id);
    await this.fuenteAguaRepository.remove(fuenteAgua);
  }
}
