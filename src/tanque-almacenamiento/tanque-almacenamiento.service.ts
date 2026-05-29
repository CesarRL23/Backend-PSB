import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TanqueAlmacenamiento } from './entities/tanque-almacenamiento.entity';
import { CreateTanqueAlmacenamientoDto } from './dto/create-tanque-almacenamiento.dto';
import { UpdateTanqueAlmacenamientoDto } from './dto/update-tanque-almacenamiento.dto';
import { validarTanque } from '../modules/agua/shared/validators';

@Injectable()
export class TanqueAlmacenamientoService {

  constructor(
    @InjectRepository(TanqueAlmacenamiento)
    private readonly tanqueRepository: Repository<TanqueAlmacenamiento>,
  ) {}

  async create(dto: CreateTanqueAlmacenamientoDto): Promise<TanqueAlmacenamiento> {
    const existente = await this.tanqueRepository.findOne({
      where: { fuenteAguaId: dto.fuenteAguaId },
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un tanque para esta fuente de agua',
      );
    }

    validarTanque({
      tieneTapa: dto.tieneTapa,
      tapaBuenEstado: dto.tapaBuenEstado,
      capacidadLitros: dto.capacidadLitros,
    });

    const tanque = this.tanqueRepository.create(dto);
    return this.tanqueRepository.save(tanque);
  }

  async findAll(): Promise<TanqueAlmacenamiento[]> {
    return this.tanqueRepository.find({
      relations: ['fuenteAgua'],
    });
  }

  async findOne(id: string): Promise<TanqueAlmacenamiento> {
    const tanque = await this.tanqueRepository.findOne({
      where: { id },
      relations: ['fuenteAgua'],
    });

    if (!tanque) {
      throw new NotFoundException(`TanqueAlmacenamiento #${id} no encontrado`);
    }

    return tanque;
  }

  async findByFuente(fuenteAguaId: string): Promise<TanqueAlmacenamiento> {
    const tanque = await this.tanqueRepository.findOne({
      where: { fuenteAguaId },
      relations: ['fuenteAgua'],
    });

    if (!tanque) {
      throw new NotFoundException(
        `No se encontró tanque para la fuente #${fuenteAguaId}`,
      );
    }

    return tanque;
  }

  async update(id: string, dto: UpdateTanqueAlmacenamientoDto): Promise<TanqueAlmacenamiento> {
    const tanque = await this.findOne(id);
    const tieneTapa = dto.tieneTapa ?? tanque.tieneTapa;
    const tapaBuenEstado = dto.tapaBuenEstado ?? tanque.tapaBuenEstado;
    validarTanque({
      tieneTapa,
      tapaBuenEstado,
      capacidadLitros: dto.capacidadLitros ?? tanque.capacidadLitros,
    });
    Object.assign(tanque, dto);
    return this.tanqueRepository.save(tanque);
  }

  async remove(id: string): Promise<void> {
    const tanque = await this.findOne(id);
    await this.tanqueRepository.remove(tanque);
  }
}
