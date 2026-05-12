// ══════════════════════════════════════════════
// accion-correctiva-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccionCorrectivaPlagas } from './entities/accion-correctiva-plagas.entity';
import { CreateAccionCorrectivaPlagasDto } from './dto/create-accion-correctiva-plagas.dto';
import { UpdateAccionCorrectivaPlagasDto } from './dto/update-accion-correctiva-plagas.dto';

@Injectable()
export class AccionCorrectivaPlagasService {
  constructor(
    @InjectRepository(AccionCorrectivaPlagas)
    private readonly repo: Repository<AccionCorrectivaPlagas>,
  ) {}

  async create(dto: CreateAccionCorrectivaPlagasDto): Promise<AccionCorrectivaPlagas> {
    const entity = this.repo.create({
      descripcion: dto.descripcion,
      responsable: dto.responsable,
      estado: dto.estado,
      prioridad: dto.prioridad,
      fecha: dto.fecha,
      hallazgoPlagas: { id: dto.hallazgoPlagaId} as any,
      plaguicida: { id: dto.plaguicidaId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<AccionCorrectivaPlagas[]> {
    return this.repo.find({ relations: ['hallazgoPlagas', 'plaguicida'] });
  }

  async findOne(id: number): Promise<AccionCorrectivaPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['hallazgoPlagas', 'plaguicida'],
    });
    if (!entity) throw new NotFoundException(`AccionCorrectivaPlagas #${id} no encontrada`);
    return entity;
  }

  async findByHallazgo(hallazgoPlagasId: number): Promise<AccionCorrectivaPlagas[]> {
    return this.repo.find({
      where: { hallazgoPlagas: { id: hallazgoPlagasId.toString() } },
      relations: ['plaguicida'],
    });
  }

  async cerrar(id: number): Promise<AccionCorrectivaPlagas> {
    const entity = await this.findOne(id);
    entity.estado = 'cerrada';
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateAccionCorrectivaPlagasDto): Promise<AccionCorrectivaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
