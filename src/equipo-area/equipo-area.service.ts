import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EquipoArea } from './entities/equipo-area.entity';
import { CreateEquipoAreaDto } from './dto/create-equipo-area.dto';
import { UpdateEquipoAreaDto } from './dto/update-equipo-area.dto';

@Injectable()
export class EquipoAreaService {

  constructor(
    @InjectRepository(EquipoArea)
    private readonly repo: Repository<EquipoArea>,
  ) {}

  async create(dto: CreateEquipoAreaDto): Promise<EquipoArea> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(): Promise<EquipoArea[]> {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  async findByEmpresa(empresaId: string): Promise<EquipoArea[]> {
    return this.repo.find({
      where: { empresaId },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string): Promise<EquipoArea> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['empresa'],
    });

    if (!entity) {
      throw new NotFoundException(`EquipoArea #${id} no encontrado`);
    }

    return entity;
  }

  async update(id: string, dto: UpdateEquipoAreaDto): Promise<EquipoArea> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
