// ══════════════════════════════════════════════
// programa-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaPlagas } from './entities/programa-plagas.entity';
import { CreateProgramaPlagasDto } from './dto/create-programa-plagas.dto';
import { UpdateProgramaPlagasDto } from './dto/update-programa-plagas.dto';

@Injectable()
export class ProgramaPlagasService {
  constructor(
    @InjectRepository(ProgramaPlagas)
    private readonly repo: Repository<ProgramaPlagas>,
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
}
