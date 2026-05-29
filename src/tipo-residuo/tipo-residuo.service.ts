import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoResiduoDto } from './dto/create-tipo-residuo.dto';
import { UpdateTipoResiduoDto } from './dto/update-tipo-residuo.dto';
import { TipoResiduo } from './entities/tipo-residuo.entity';

@Injectable()
export class TipoResiduoService {
  constructor(
    @InjectRepository(TipoResiduo)
    private readonly tipoResiduoRepository: Repository<TipoResiduo>,
  ) {}

  async create(createTipoResiduoDto: CreateTipoResiduoDto): Promise<TipoResiduo> {
    const tipoResiduo = this.tipoResiduoRepository.create(createTipoResiduoDto);
    return this.tipoResiduoRepository.save(tipoResiduo);
  }

  async findAll(): Promise<TipoResiduo[]> {
    return this.tipoResiduoRepository.find();
  }

  async findOne(id: number): Promise<TipoResiduo> {
    const tipoResiduo = await this.tipoResiduoRepository.findOneBy({ id: id.toString() });
    if (!tipoResiduo) {
      throw new NotFoundException(`Tipo de residuo con id ${id} no encontrado`);
    }
    return tipoResiduo;
  }

  async update(id: number, updateTipoResiduoDto: UpdateTipoResiduoDto): Promise<TipoResiduo> {
    const tipoResiduo = await this.findOne(id);
    Object.assign(tipoResiduo, updateTipoResiduoDto);
    return this.tipoResiduoRepository.save(tipoResiduo);
  }

  async remove(id: number): Promise<void> {
    const tipoResiduo = await this.findOne(id);
    await this.tipoResiduoRepository.remove(tipoResiduo);
  }
}
