import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

import { ProgramaAgua } from './entities/programa-agua.entity';
import { CreateProgramaAguaDto } from './dto/create-programa-agua.dto';
import { UpdateProgramaAguaDto } from './dto/update-programa-agua.dto';

@Injectable()
export class ProgramaAguaService {

  constructor(
    @InjectRepository(ProgramaAgua)
    private readonly programaAguaRepository: Repository<ProgramaAgua>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateProgramaAguaDto): Promise<ProgramaAgua> {
    const existente = await this.programaAguaRepository.findOne({
      where: { programaId: dto.programaId },
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un programa de agua para este programa',
      );
    }

    const programaAgua = this.programaAguaRepository.create(dto);
    return this.programaAguaRepository.save(programaAgua);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<ProgramaAgua[]> {
    return this.programaAguaRepository.find({
      relations: ['programa', 'fuentesAgua'],
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<ProgramaAgua> {
    const programaAgua = await this.programaAguaRepository.findOne({
      where: { id },
      relations: ['programa', 'fuentesAgua'],
    });

    if (!programaAgua) {
      throw new NotFoundException(`ProgramaAgua #${id} no encontrado`);
    }

    return programaAgua;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateProgramaAguaDto): Promise<ProgramaAgua> {
    const programaAgua = await this.findOne(id);
    Object.assign(programaAgua, dto);
    return this.programaAguaRepository.save(programaAgua);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const programaAgua = await this.findOne(id);
    try {
      await this.programaAguaRepository.remove(programaAgua);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).driverError?.code === '23503') {
        throw new ConflictException(
          'No se puede eliminar el programa de agua porque tiene fuentes de agua o registros asociados.',
        );
      }
      throw error;
    }
  }
}