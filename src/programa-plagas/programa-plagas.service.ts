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
    @InjectRepository(RegistroPlagas)
    private readonly registroRepo: Repository<RegistroPlagas>,
    @InjectRepository(AreaPlagas)
    private readonly areaRepo: Repository<AreaPlagas>,
  ) {}
 
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
 
  async findOne(id: string): Promise<ProgramaPlagas> {
    const entity = await this.repo.findOne({
      where: { id },
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
 
  async update(id: string, dto: UpdateProgramaPlagasDto): Promise<ProgramaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.objetivo && { objetivo: dto.objetivo }),
      ...(dto.alcance && { alcance: dto.alcance }),
      ...(dto.procGeneral && { procGeneral: dto.procGeneral }),
    });
    return this.repo.save(entity);
  }
 
  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
 
  async obtenerEstadisticas(id: string): Promise<{
    totalRegistros: number;
    totalHallazgos: number;
    totalTrampas: number;
    totalAcciones: number;
    totalAreas: number;
    totalPlaguicidas: number;
  }> {
    const programa = await this.repo.findOne({
      where: { id },
      relations: ['registrosPlagas', 'areasPlagas', 'plaguicidas'],
    });
 
    if (!programa) throw new NotFoundException(`ProgramaPlagas #${id} no encontrado`);
 
    const totalRegistros  = programa.registrosPlagas?.length ?? 0;
    const totalAreas      = programa.areasPlagas?.length ?? 0;
    const totalPlaguicidas = programa.plaguicidas?.length ?? 0;
 
    const totalHallazgos = await this.registroRepo
      .createQueryBuilder('rp')
      .innerJoin('rp.hallazgosPlagas', 'hp')
      .where('rp.programaPlagasId = :id', { id })
      .getCount();
 
    const totalAcciones = await this.registroRepo
      .createQueryBuilder('rp')
      .innerJoin('rp.hallazgosPlagas', 'hp')
      .innerJoin('hp.accionCorrectivaPlagas', 'ac')
      .where('rp.programaPlagasId = :id', { id })
      .getCount();
 
    const totalTrampas = await this.areaRepo
      .createQueryBuilder('ap')
      .innerJoin('ap.trampas', 't')
      .where('ap.programaPlagasId = :id', { id })
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
 