import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallazgoPlagas } from './entities/hallazgo-plagas.entity';
import { CreateHallazgoPlagasDto } from './dto/create-hallazgo-plagas.dto';
import { UpdateHallazgoPlagasDto } from './dto/update-hallazgo-plagas.dto';
import { AccionCorrectivaPlagas } from 'src/accion-correctiva-plagas/entities/accion-correctiva-plagas.entity';

@Injectable()
export class HallazgoPlagasService {
  constructor(
    @InjectRepository(HallazgoPlagas)
    private readonly repo: Repository<HallazgoPlagas>,

    // Necesario para crear las acciones correctivas asociadas
    @InjectRepository(AccionCorrectivaPlagas)
    private readonly accionRepo: Repository<AccionCorrectivaPlagas>,
  ) { }

  async create(dto: CreateHallazgoPlagasDto): Promise<HallazgoPlagas> {
    // 1. Crea y guarda el hallazgo principal
    const entity = this.repo.create({
      descripcion: dto.descripcion,
      severidad: dto.severidad,
      estado: dto.estado,
      fecha: dto.fecha,
      registroPlagas: { id: dto.registroPlagaId } as any,
      tipoPlaga: { id: dto.tipoPlagaId } as any,
    });
    const saved = await this.repo.save(entity);
    return this.findOne(saved.id);

  }

  async findAll(): Promise<HallazgoPlagas[]> {
    return this.repo.find({
      relations: ['registroPlagas', 'tipoPlaga', 'accionCorrectivaPlagas'],
    });
  }

  // ← id ahora es string en todos los métodos
  async findOne(id: string): Promise<HallazgoPlagas> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['registroPlagas', 'tipoPlaga', 'accionCorrectivaPlagas'],
    });
    if (!entity) throw new NotFoundException(`HallazgoPlagas #${id} no encontrado`);
    return entity;
  }

  async findByRegistro(registroPlagasId: string): Promise<HallazgoPlagas[]> {
    return this.repo.find({
      where: { registroPlagas: { id: registroPlagasId } },
      relations: ['tipoPlaga', 'accionCorrectivaPlagas'],
    });
  }

  async update(id: string, dto: UpdateHallazgoPlagasDto): Promise<HallazgoPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.descripcion && { descripcion: dto.descripcion }),
      ...(dto.severidad && { severidad: dto.severidad }),
      ...(dto.estado && { estado: dto.estado }),
      ...(dto.fecha && { fecha: dto.fecha }),
      ...(dto.tipoPlagaId && { tipoPlaga: { id: dto.tipoPlagaId } }),
      ...(dto.registroPlagaId && { registroPlagas: { id: dto.registroPlagaId } }),
    });
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
