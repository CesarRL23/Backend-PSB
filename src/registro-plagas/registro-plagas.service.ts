// ══════════════════════════════════════════════
// registro-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroPlagas } from './entities/registro-plagas.entity';
import { CreateRegistroPlagasDto } from './dto/create-registro-plagas.dto';
import { UpdateRegistroPlagasDto } from './dto/update-registro-plagas.dto';

@Injectable()
export class RegistroPlagasService {
  constructor(
    @InjectRepository(RegistroPlagas)
    private readonly repo: Repository<RegistroPlagas>,
  ) {}

  async create(dto: CreateRegistroPlagasDto): Promise<RegistroPlagas> {
    const entity = this.repo.create({
      TipoActividad: dto.tipoActividad,
      resultadoGeneral: dto.resultadoGeneral,
      registro: { id: dto.registroId } as any,
      programaPlagas: { id: dto.programaPlagasId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<RegistroPlagas[]> {
    return this.repo.find({
      relations: ['registro', 'programaPlagas', 'hallazgosPlagas', 'evidenciasPlagas'],
    });
  }

  async findOne(id: number): Promise<RegistroPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['registro', 'programaPlagas', 'hallazgosPlagas', 'evidenciasPlagas'],
    });
    if (!entity) throw new NotFoundException(`RegistroPlagas #${id} no encontrado`);
    return entity;
  }

  async update(id: number, dto: UpdateRegistroPlagasDto): Promise<RegistroPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.tipoActividad && { TipoActividad: dto.tipoActividad }),
      ...(dto.resultadoGeneral && { resultadoGeneral: dto.resultadoGeneral }),
    });
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
