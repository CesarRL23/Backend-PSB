import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResiduoDto } from './dto/create-residuo.dto';
import { UpdateResiduoDto } from './dto/update-residuo.dto';
import { Residuo } from './entities/residuo.entity';

@Injectable()
export class ResiduoService {
  constructor(
    @InjectRepository(Residuo)
    private readonly residuoRepository: Repository<Residuo>,
  ) {}

  async create(createResiduoDto: CreateResiduoDto): Promise<Residuo> {
    const residuo = this.residuoRepository.create(createResiduoDto);
    return this.residuoRepository.save(residuo);
  }

  async findAll(): Promise<Residuo[]> {
    return this.residuoRepository.find();
  }

  async findOne(id: number): Promise<Residuo> {
    const residuo = await this.residuoRepository.findOneBy({ id: id.toString() });
    if (!residuo) {
      throw new NotFoundException(`Residuo con id ${id} no encontrado`);
    }
    return residuo;
  }

  async update(id: number, updateResiduoDto: UpdateResiduoDto): Promise<Residuo> {
    const residuo = await this.findOne(id);
    Object.assign(residuo, updateResiduoDto);
    return this.residuoRepository.save(residuo);
  }

  async remove(id: number): Promise<void> {
    const residuo = await this.findOne(id);
    await this.residuoRepository.remove(residuo);
  }
}
