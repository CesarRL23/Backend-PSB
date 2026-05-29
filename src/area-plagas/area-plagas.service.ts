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
 
  async findOne(id: string): Promise<AreaPlagas> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['programaPlagas', 'trampas'],
    });
    if (!entity) throw new NotFoundException(`AreaPlagas #${id} no encontrada`);
    return entity;
  }
 
  async findByPrograma(programaPlagasId: string): Promise<AreaPlagas[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId } },
      relations: ['trampas'],
    });
  }
 
  async update(id: string, dto: UpdateAreaPlagasDto): Promise<AreaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.nombre && { nombre: dto.nombre }),
      ...(dto.descripcion && { descripcion: dto.descripcion }),
      ...(dto.nivelRiesgo && { nivelRiesgo: dto.nivelRiesgo }),
      ...(dto.programaPlagasId && { programaPlagas: { id: dto.programaPlagasId } }),
    });
    return this.repo.save(entity);
  }
 
  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}