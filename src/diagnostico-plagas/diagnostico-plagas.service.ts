// ══════════════════════════════════════════════
// diagnostico-plagas.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoPlagas } from './entities/diagnostico-plagas.entity';
import { CreateDiagnosticoPlagasDto } from './dto/create-diagnostico-plagas.dto';
import { UpdateDiagnosticoPlagasDto } from './dto/update-diagnostico-plagas.dto';

@Injectable()
export class DiagnosticoPlagasService {
  constructor(
    @InjectRepository(DiagnosticoPlagas)
    private readonly repo: Repository<DiagnosticoPlagas>,
  ) {}

  async create(dto: CreateDiagnosticoPlagasDto): Promise<DiagnosticoPlagas> {
    const entity = this.repo.create({
      nivelRiesgo: dto.nivelRiesgo,
      areasEvaluadas: dto.areasEvaluadas,
      plagasIdentificadas: dto.plagasIdentificadas,
      observaciones: dto.observaciones,
      fecha: dto.fecha,
      programaPlagas: { id: dto.programaPlagasId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<DiagnosticoPlagas[]> {
    return this.repo.find({ relations: ['programaPlagas'] });
  }

  async findOne(id: number): Promise<DiagnosticoPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['programaPlagas'],
    });
    if (!entity) throw new NotFoundException(`DiagnosticoPlagas #${id} no encontrado`);
    return entity;
  }

  async findByPrograma(programaPlagasId: number): Promise<DiagnosticoPlagas[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId.toString() } },
    });
  }

  async update(id: number, dto: UpdateDiagnosticoPlagasDto): Promise<DiagnosticoPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
