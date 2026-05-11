import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegistroAgua, ResultadoGeneralAgua } from './entities/registro-agua.entity';
import { CreateRegistroAguaDto } from './dto/create-registro-agua.dto';
import { UpdateRegistroAguaDto } from './dto/update-registro-agua.dto';

@Injectable()
export class RegistroAguaService {

  constructor(
    @InjectRepository(RegistroAgua)
    private readonly registroAguaRepository: Repository<RegistroAgua>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateRegistroAguaDto): Promise<RegistroAgua> {
    const existente = await this.registroAguaRepository.findOne({
      where: { registroId: dto.registroId },
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un registro de agua para este registro base',
      );
    }

    const registroAgua = this.registroAguaRepository.create(dto);
    return this.registroAguaRepository.save(registroAgua);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<RegistroAgua[]> {
    return this.registroAguaRepository.find({
      relations: ['registro'],
      order: { registro: { fecha: 'DESC' } },
    });
  }

  // ─── Listar por programa agua ─────────────────────────────────────────────────

  async findByProgramaAgua(programaAguaId: string): Promise<RegistroAgua[]> {
    return this.registroAguaRepository.find({
      where: { programaAguaId },
      relations: ['registro'],
    });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<RegistroAgua> {
    const registroAgua = await this.registroAguaRepository.findOne({
      where: { id },
      relations: ['registro'],
    });

    if (!registroAgua) {
      throw new NotFoundException(`RegistroAgua #${id} no encontrado`);
    }

    return registroAgua;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateRegistroAguaDto): Promise<RegistroAgua> {
    const registroAgua = await this.findOne(id);
    Object.assign(registroAgua, dto);
    return this.registroAguaRepository.save(registroAgua);
  }

  // ─── Marcar conforme ─────────────────────────────────────────────────────────

  async marcarConforme(id: string): Promise<RegistroAgua> {
    return this.update(id, { resultadoGeneral: ResultadoGeneralAgua.CONFORME });
  }

  // ─── Marcar no conforme ───────────────────────────────────────────────────────

  async marcarNoConforme(id: string): Promise<RegistroAgua> {
    return this.update(id, { resultadoGeneral: ResultadoGeneralAgua.NO_CONFORME });
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const registroAgua = await this.findOne(id);
    await this.registroAguaRepository.remove(registroAgua);
  }
}