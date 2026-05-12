import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { CreateControlDiarioPotabilidadDto } from './dto/create-control-diario-potabilidad.dto';
import { UpdateControlDiarioPotabilidadDto } from './dto/update-control-diario-potabilidad.dto';

@Injectable()
export class ControlDiarioPotabilidadService {

  constructor(
    @InjectRepository(ControlDiarioPotabilidad)
    private readonly controlRepository: Repository<ControlDiarioPotabilidad>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateControlDiarioPotabilidadDto): Promise<ControlDiarioPotabilidad> {
    const control = this.controlRepository.create(dto);
    return this.controlRepository.save(control);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      relations: ['fuenteAgua', 'registroAgua'],
      order: { fechaHora: 'DESC' },
    });
  }

  // ─── Listar por fuente ───────────────────────────────────────────────────────

  async findByFuente(fuenteAguaId: string): Promise<ControlDiarioPotabilidad[]> {
    return this.controlRepository.find({
      where: { fuenteAguaId },
      order: { fechaHora: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<ControlDiarioPotabilidad> {
    const control = await this.controlRepository.findOne({
      where: { id },
      relations: ['fuenteAgua', 'registroAgua'],
    });

    if (!control) {
      throw new NotFoundException(`ControlDiarioPotabilidad #${id} no encontrado`);
    }

    return control;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateControlDiarioPotabilidadDto): Promise<ControlDiarioPotabilidad> {
    const control = await this.findOne(id);
    Object.assign(control, dto);
    return this.controlRepository.save(control);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const control = await this.findOne(id);
    await this.controlRepository.remove(control);
  }
}