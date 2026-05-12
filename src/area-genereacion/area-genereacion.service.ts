import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaGenereacionDto } from './dto/create-area-genereacion.dto';
import { UpdateAreaGenereacionDto } from './dto/update-area-genereacion.dto';
import { AreaGenereacion } from './entities/area-genereacion.entity';

@Injectable()
export class AreaGenereacionService {
  constructor(
    @InjectRepository(AreaGenereacion)
    private readonly areaGenereacionRepository: Repository<AreaGenereacion>,
  ) {}

  async create(createAreaGenereacionDto: CreateAreaGenereacionDto): Promise<AreaGenereacion> {
    const areaGenereacion = this.areaGenereacionRepository.create(createAreaGenereacionDto);
    return this.areaGenereacionRepository.save(areaGenereacion);
  }

  async findAll(): Promise<AreaGenereacion[]> {
    return this.areaGenereacionRepository.find();
  }

  async findOne(id: number): Promise<AreaGenereacion> {
    const areaGenereacion = await this.areaGenereacionRepository.findOneBy({ id: id.toString() });
    if (!areaGenereacion) {
      throw new NotFoundException(`Area de generación con id ${id} no encontrada`);
    }
    return areaGenereacion;
  }

  async update(id: number, updateAreaGenereacionDto: UpdateAreaGenereacionDto): Promise<AreaGenereacion> {
    const areaGenereacion = await this.findOne(id);
    Object.assign(areaGenereacion, updateAreaGenereacionDto);
    return this.areaGenereacionRepository.save(areaGenereacion);
  }

  async remove(id: number): Promise<void> {
    const areaGenereacion = await this.findOne(id);
    await this.areaGenereacionRepository.remove(areaGenereacion);
  }
}
