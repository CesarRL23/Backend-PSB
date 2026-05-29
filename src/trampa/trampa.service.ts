import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trampa } from './entities/trampa.entity';
import { CreateTrampaDto } from './dto/create-trampa.dto';
import { UpdateTrampaDto } from './dto/update-trampa.dto';
 
@Injectable()
export class TrampaService {
  constructor(
    @InjectRepository(Trampa)
    private readonly repo: Repository<Trampa>,
  ) {}
 
  async create(dto: CreateTrampaDto): Promise<Trampa> {
    const entity = this.repo.create({
      codigo: dto.codigo,
      tipo: dto.tipo,
      ubicacion: dto.ubicacion,
      estado: dto.estado,
      fecha_instalacion: dto.fecha_instalacion,
      fecha_revision: dto.ultima_revision,
      areaPlagas: { id: dto.areaPlagaId } as any,
    });
    return this.repo.save(entity);
  }
 
  async findAll(): Promise<Trampa[]> {
    return this.repo.find({ relations: ['areaPlagas'] });
  }
 
  async findOne(id: string): Promise<Trampa> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['areaPlagas'],
    });
    if (!entity) throw new NotFoundException(`Trampa #${id} no encontrada`);
    return entity;
  }
 
  async findByArea(areaPlagasId: string): Promise<Trampa[]> {
    return this.repo.find({
      where: { areaPlagas: { id: areaPlagasId } },
    });
  }
 
  async activar(id: string): Promise<Trampa> {
    const entity = await this.findOne(id);
    entity.estado = 'activa';
    return this.repo.save(entity);
  }
 
  async desactivar(id: string): Promise<Trampa> {
    const entity = await this.findOne(id);
    entity.estado = 'inactiva';
    return this.repo.save(entity);
  }
 
  async registrarRevision(id: string): Promise<Trampa> {
    const entity = await this.findOne(id);
    entity.fecha_revision = new Date();
    return this.repo.save(entity);
  }
 
  async update(id: string, dto: UpdateTrampaDto): Promise<Trampa> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.codigo && { codigo: dto.codigo }),
      ...(dto.tipo && { tipo: dto.tipo }),
      ...(dto.ubicacion && { ubicacion: dto.ubicacion }),
      ...(dto.estado && { estado: dto.estado }),
      ...(dto.fecha_instalacion && { fecha_instalacion: dto.fecha_instalacion }),
      ...(dto.ultima_revision && { fecha_revision: dto.ultima_revision }),
      ...(dto.areaPlagaId && { areaPlagas: { id: dto.areaPlagaId } }),
    });
    return this.repo.save(entity);
  }
 
  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
 