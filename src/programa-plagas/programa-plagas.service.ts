// ══════════════════════════════════════════════
// programa-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaPlagas } from './entities/programa-plagas.entity';
import { CreateProgramaPlagasDto } from './dto/create-programa-plagas.dto';
import { UpdateProgramaPlagasDto } from './dto/update-programa-plagas.dto';
import { AreaPlagas } from 'src/area-plagas/entities/area-plagas.entity';
import { RegistroPlagas } from 'src/registro-plagas/entities/registro-plagas.entity';

@Injectable()
export class ProgramaPlagasService {
  constructor(
    @InjectRepository(ProgramaPlagas)
    private readonly repo: Repository<ProgramaPlagas>,
    @InjectRepository(RegistroPlagas)          // ← nuevo
    private readonly registroRepo: Repository<RegistroPlagas>,

    @InjectRepository(AreaPlagas)              // ← nuevo
    private readonly areaRepo: Repository<AreaPlagas>,
  ) { }


  async create(dto: CreateProgramaPlagasDto): Promise<ProgramaPlagas> {
    const entity = this.repo.create({
      objetivo: dto.objetivo,
      alcance: dto.alcance,
      procGeneral: dto.procGeneral,
      fecha_envio: dto.fecha_envio,
      fecha_limite: dto.fecha_limite,
      programa: { id: dto.programaId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<ProgramaPlagas[]> {
    return this.repo.find({
      relations: [
        'programa',
        'empresasFumigadoras',
        'diagnosticosPlagas',
        'cronogramasPlagas',
        'areasPlagas',
        'plaguicidas',
        'registrosPlagas',
      ],
    });
  }

  async findOne(id: number): Promise<ProgramaPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: [
        'programa',
        'empresasFumigadoras',
        'diagnosticosPlagas',
        'cronogramasPlagas',
        'areasPlagas',
        'plaguicidas',
        'registrosPlagas',
      ],
    });
    if (!entity) throw new NotFoundException(`ProgramaPlagas #${id} no encontrado`);
    return entity;
  }

  async update(id: number, dto: UpdateProgramaPlagasDto): Promise<ProgramaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
  async obtenerEstadisticas(id: number): Promise<{
    totalRegistros: number;
    totalHallazgos: number;
    totalTrampas: number;
    totalAcciones: number;
    totalAreas: number;
    totalPlaguicidas: number;
  }> {
    const idStr = id.toString();

    // Conteos directos desde ProgramaPlagas
    const programa = await this.repo.findOne({
      where: { id: idStr },
      relations: ['registrosPlagas', 'areasPlagas', 'plaguicidas'],
    });

    if (!programa) {
      throw new NotFoundException(`ProgramaPlagas #${id} no encontrado`);
    }

    const totalRegistros = programa.registrosPlagas?.length ?? 0;
    const totalAreas = programa.areasPlagas?.length ?? 0;
    const totalPlaguicidas = programa.plaguicidas?.length ?? 0;

    // Hallazgos: vienen de registrosPlagas → hallazgosPlagas
    // Se cuenta con un QueryBuilder para no cargar todos los objetos en memoria
    const totalHallazgos = await this.registroRepo
      .createQueryBuilder('rp')
      .innerJoin('rp.hallazgosPlagas', 'hp')
      .where('rp.programaPlagasId = :id', { id: idStr })
      .getCount();

    // Acciones correctivas: vienen de registros → hallazgos → acciones
    const totalAcciones = await this.registroRepo
      .createQueryBuilder('rp')
      .innerJoin('rp.hallazgosPlagas', 'hp')
      .innerJoin('hp.accionCorrectivaPlagas', 'ac')
      .where('rp.programaPlagasId = :id', { id: idStr })
      .getCount();

    // Trampas: vienen de areasPlagas → trampas
    const totalTrampas = await this.areaRepo
      .createQueryBuilder('ap')
      .innerJoin('ap.trampas', 't')
      .where('ap.programaPlagasId = :id', { id: idStr })
      .getCount();

    return {
      totalRegistros,
      totalHallazgos,
      totalTrampas,
      totalAcciones,
      totalAreas,
      totalPlaguicidas,
    };
  }
}
