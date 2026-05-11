import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { CreateAnalisisLaboratorioDto } from './dto/create-analisis-laboratorio.dto';
import { UpdateAnalisisLaboratorioDto } from './dto/update-analisis-laboratorio.dto';

@Injectable()
export class AnalisisLaboratorioService {

  constructor(
    @InjectRepository(AnalisisLaboratorio)
    private readonly analisisRepository: Repository<AnalisisLaboratorio>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateAnalisisLaboratorioDto): Promise<AnalisisLaboratorio> {
    const analisis = this.analisisRepository.create(dto);
    return this.analisisRepository.save(analisis);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<AnalisisLaboratorio[]> {
    return this.analisisRepository.find({
      relations: ['fuenteAgua', 'registroAgua'],
      order: { fechaMuestreo: 'DESC' },
    });
  }

  // ─── Listar por fuente ───────────────────────────────────────────────────────

  async findByFuente(fuenteAguaId: string): Promise<AnalisisLaboratorio[]> {
    return this.analisisRepository.find({
      where: { fuenteAguaId },
      order: { fechaMuestreo: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<AnalisisLaboratorio> {
    const analisis = await this.analisisRepository.findOne({
      where: { id },
      relations: ['fuenteAgua', 'registroAgua'],
    });

    if (!analisis) {
      throw new NotFoundException(`AnalisisLaboratorio #${id} no encontrado`);
    }

    return analisis;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateAnalisisLaboratorioDto): Promise<AnalisisLaboratorio> {
    const analisis = await this.findOne(id);
    Object.assign(analisis, dto);
    return this.analisisRepository.save(analisis);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const analisis = await this.findOne(id);
    await this.analisisRepository.remove(analisis);
  }
}