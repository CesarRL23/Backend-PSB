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
      hallazgoPlagas: { id: dto.hallazgoPlagaId } as any,
      plaguicida: { id: dto.plaguicidaId } as any,
    });
    return this.repo.save(entity);
  }
 
  async findAll(): Promise<AccionCorrectivaPlagas[]> {
    return this.repo.find({ relations: ['hallazgoPlagas', 'plaguicida'] });
  }
 
  async findOne(id: string): Promise<AccionCorrectivaPlagas> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['hallazgoPlagas', 'plaguicida'],
    });
    if (!entity) throw new NotFoundException(`AccionCorrectivaPlagas #${id} no encontrada`);
    return entity;
  }
 
  async findByHallazgo(hallazgoPlagasId: string): Promise<AccionCorrectivaPlagas[]> {
    return this.repo.find({
      where: { hallazgoPlagas: { id: hallazgoPlagasId } },
      relations: ['plaguicida'],
    });
  }
 
  async cerrar(id: string): Promise<AccionCorrectivaPlagas> {
    const entity = await this.findOne(id);
    entity.estado = 'cerrada';
    return this.repo.save(entity);
  }
 
  async update(id: string, dto: UpdateAccionCorrectivaPlagasDto): Promise<AccionCorrectivaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.descripcion && { descripcion: dto.descripcion }),
      ...(dto.responsable && { responsable: dto.responsable }),
      ...(dto.estado && { estado: dto.estado }),
      ...(dto.prioridad && { prioridad: dto.prioridad }),
      ...(dto.fecha && { fecha: dto.fecha }),
      ...(dto.plaguicidaId && { plaguicida: { id: dto.plaguicidaId } }),
      ...(dto.hallazgoPlagaId && { hallazgoPlagas: { id: dto.hallazgoPlagaId } }),
    });
    return this.repo.save(entity);
  }
 
  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
 