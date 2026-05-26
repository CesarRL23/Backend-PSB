import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAlimento } from './entities/tipo-alimento.entity';
import { CreateTipoAlimentoDto } from './dto/create-tipo-alimento.dto';
import { UpdateTipoAlimentoDto } from './dto/update-tipo-alimento.dto';

@Injectable()
export class TipoAlimentoService {
  constructor(
    @InjectRepository(TipoAlimento)
    private readonly tipoAlimentoRepository: Repository<TipoAlimento>,
  ) {}

  create(dto: CreateTipoAlimentoDto): Promise<TipoAlimento> {
    const tipoAlimento = this.tipoAlimentoRepository.create(dto);
    return this.tipoAlimentoRepository.save(tipoAlimento);
  }

  findAll(): Promise<TipoAlimento[]> {
    return this.tipoAlimentoRepository.find();
  }

  async findOne(id: number): Promise<TipoAlimento> {
    const tipoAlimento = await this.tipoAlimentoRepository.findOne({ where: { id: String(id) } });
    if (!tipoAlimento) {
      throw new NotFoundException(`TipoAlimento #${id} no encontrado`);
    }
    return tipoAlimento;
  }

  async update(id: number, dto: UpdateTipoAlimentoDto): Promise<TipoAlimento> {
    const tipoAlimento = await this.findOne(id);
    Object.assign(tipoAlimento, dto);
    return this.tipoAlimentoRepository.save(tipoAlimento);
  }

  async remove(id: number): Promise<void> {
    const tipoAlimento = await this.findOne(id);
    await this.tipoAlimentoRepository.remove(tipoAlimento);
  }
}
