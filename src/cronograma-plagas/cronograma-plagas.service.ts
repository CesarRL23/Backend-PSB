// ══════════════════════════════════════════════
// cronograma-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CronogramaPlagas } from './entities/cronograma-plagas.entity';
import { CreateCronogramaPlagasDto } from './dto/create-cronograma-plagas.dto';
import { UpdateCronogramaPlagasDto } from './dto/update-cronograma-plagas.dto';

@Injectable()
export class CronogramaPlagasService {
  constructor(
    @InjectRepository(CronogramaPlagas)
    private readonly repo: Repository<CronogramaPlagas>,
  ) {}

  async create(dto: CreateCronogramaPlagasDto): Promise<CronogramaPlagas> {
    const entity = this.repo.create({
      frecuenciaControl: dto.frecuenciaControl,
      metodoControl: dto.metodoControl,
      responsable: dto.responsable,
      anioVigencia: dto.anioVigencia,
      programaPlagas: { id: dto.programaPlagasId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<CronogramaPlagas[]> {
    return this.repo.find({ relations: ['programaPlagas'] });
  }

  async findOne(id: number): Promise<CronogramaPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['programaPlagas'],
    });
    if (!entity) throw new NotFoundException(`CronogramaPlagas #${id} no encontrado`);
    return entity;
  }

  async findByPrograma(programaPlagasId: number): Promise<CronogramaPlagas[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId.toString() } },
    });
  }

  async update(id: number, dto: UpdateCronogramaPlagasDto): Promise<CronogramaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
