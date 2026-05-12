// ══════════════════════════════════════════════
// tipo-plaga.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoPlaga } from './entities/tipo-plaga.entity';
import { CreateTipoPlagaDto } from './dto/create-tipo-plaga.dto';
import { UpdateTipoPlagaDto } from './dto/update-tipo-plaga.dto';

@Injectable()
export class TipoPlagaService {
  constructor(
    @InjectRepository(TipoPlaga)
    private readonly repo: Repository<TipoPlaga>,
  ) {}

  async create(dto: CreateTipoPlagaDto): Promise<TipoPlaga> {
    const entity = this.repo.create({
      nombre: dto.nombre,
      categoria: dto.categoria,
      riesgoSanitario: dto.riesgoSanitario,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<TipoPlaga[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<TipoPlaga> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['hallazgosPlagas'],
    });
    if (!entity) throw new NotFoundException(`TipoPlaga #${id} no encontrado`);
    return entity;
  }

  async findByCategoria(categoria: string): Promise<TipoPlaga[]> {
    return this.repo.find({ where: { categoria } });
  }

  async update(id: number, dto: UpdateTipoPlagaDto): Promise<TipoPlaga> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
