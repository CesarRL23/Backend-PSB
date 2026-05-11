import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { Recoleccion } from './entities/recoleccion.entity';

@Injectable()
export class RecoleccionService {
  constructor(
    @InjectRepository(Recoleccion)
    private readonly recoleccionRepository: Repository<Recoleccion>,
  ) {}

  async create(createRecoleccionDto: CreateRecoleccionDto): Promise<Recoleccion> {
    const recoleccion = this.recoleccionRepository.create(createRecoleccionDto);
    return this.recoleccionRepository.save(recoleccion);
  }

  async findAll(): Promise<Recoleccion[]> {
    return this.recoleccionRepository.find();
  }

  async findOne(id: number): Promise<Recoleccion> {
    const recoleccion = await this.recoleccionRepository.findOneBy({ id: id.toString() });
    if (!recoleccion) {
      throw new NotFoundException(`Recolección con id ${id} no encontrada`);
    }
    return recoleccion;
  }

  async update(id: number, updateRecoleccionDto: UpdateRecoleccionDto): Promise<Recoleccion> {
    const recoleccion = await this.findOne(id);
    Object.assign(recoleccion, updateRecoleccionDto);
    return this.recoleccionRepository.save(recoleccion);
  }

  async remove(id: number): Promise<void> {
    const recoleccion = await this.findOne(id);
    await this.recoleccionRepository.remove(recoleccion);
  }
}
