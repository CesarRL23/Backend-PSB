import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Programa } from './entities/programa.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Injectable()
export class ProgramaService {

  constructor(
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateProgramaDto): Promise<Programa> {
    const existente = await this.programaRepository.findOne({
      where: { planPsbId: dto.planPsbId, tipo: dto.tipo },
    });

    if (existente) {
      throw new ConflictException(
        `Ya existe un programa de tipo "${dto.tipo}" para este plan PSB`,
      );
    }

    const programa = this.programaRepository.create(dto);
    return this.programaRepository.save(programa);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<Programa[]> {
    return this.programaRepository.find({
      relations: ['planPsb', 'registros'],
      order: { createdAt: 'DESC' },
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<Programa> {
    const programa = await this.programaRepository.findOne({
      where: { id },
      relations: ['planPsb', 'registros'],
    });

    if (!programa) {
      throw new NotFoundException(`Programa #${id} no encontrado`);
    }

    return programa;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, dto);
    return this.programaRepository.save(programa);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const programa = await this.programaRepository.findOne({
      where: { id },
      relations: ['registros'],
    });

    if (!programa) {
      throw new NotFoundException(`Programa #${id} no encontrado`);
    }

    if (programa.registros?.length > 0) {
      throw new ConflictException(
        `No se puede eliminar: el programa tiene ${programa.registros.length} registro(s) asociado(s)`,
      );
    }

    await this.programaRepository.remove(programa);
  }
}