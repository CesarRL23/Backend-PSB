// ══════════════════════════════════════════════
// area-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaPlagas } from './entities/area-plagas.entity';
import { CreateAreaPlagasDto } from './dto/create-area-plagas.dto';
import { UpdateAreaPlagasDto } from './dto/update-area-plagas.dto';

@Injectable()
export class AreaPlagasService {
  constructor(
    @InjectRepository(AreaPlagas)
    private readonly repo: Repository<AreaPlagas>,
  ) {}

  async create(dto: CreateAreaPlagasDto): Promise<AreaPlagas> {
    const entity = this.repo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      nivelRiesgo: dto.nivelRiesgo,
      programaPlagas: { id: dto.programaPlagasId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<AreaPlagas[]> {
    return this.repo.find({ relations: ['programaPlagas', 'trampas'] });
  }

  async findOne(id: number): Promise<AreaPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['programaPlagas', 'trampas'],
    });
    if (!entity) throw new NotFoundException(`AreaPlagas #${id} no encontrada`);
    return entity;
  }

  async findByPrograma(programaPlagasId: number): Promise<AreaPlagas[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId.toString() } },
      relations: ['trampas'],
    });
  }

  async update(id: number, dto: UpdateAreaPlagasDto): Promise<AreaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

