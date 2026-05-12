// ══════════════════════════════════════════════
// hallazgo-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallazgoPlagas } from './entities/hallazgo-plagas.entity';
import { CreateHallazgoPlagasDto } from './dto/create-hallazgo-plagas.dto';
import { UpdateHallazgoPlagasDto } from './dto/update-hallazgo-plagas.dto';

@Injectable()
export class HallazgoPlagasService {
  constructor(
    @InjectRepository(HallazgoPlagas)
    private readonly repo: Repository<HallazgoPlagas>,
  ) {}

  async create(dto: CreateHallazgoPlagasDto): Promise<HallazgoPlagas> {
    const entity = this.repo.create({
      descripcion: dto.descripcion,
      severidad: dto.severidad,
      estado: dto.estado,
      fecha: dto.fecha,
      registroPlagas: { id: dto.registroPlagaId } as any,
      tipoPlaga: { id: dto.tipoPlagaId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<HallazgoPlagas[]> {
    return this.repo.find({
      relations: ['registroPlagas', 'tipoPlaga', 'accionCorrectivaPlagas'],
    });
  }

  async findOne(id: number): Promise<HallazgoPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['registroPlagas', 'tipoPlaga', 'accionCorrectivaPlagas'],
    });
    if (!entity) throw new NotFoundException(`HallazgoPlagas #${id} no encontrado`);
    return entity;
  }

  async findByRegistro(registroPlagasId: number): Promise<HallazgoPlagas[]> {
    return this.repo.find({
      where: { registroPlagas: { id: registroPlagasId.toString() } },
      relations: ['tipoPlaga', 'accionCorrectivaPlagas'],
    });
  }

  async update(id: number, dto: UpdateHallazgoPlagasDto): Promise<HallazgoPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

