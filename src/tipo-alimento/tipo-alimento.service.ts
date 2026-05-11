import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoAlimentoDto } from './dto/create-tipo-alimento.dto';
import { UpdateTipoAlimentoDto } from './dto/update-tipo-alimento.dto';
import { TipoAlimento } from './entities/tipo-alimento.entity';

@Injectable()
export class TipoAlimentoService {
  constructor(
    @InjectRepository(TipoAlimento)
    private readonly tipoAlimentoRepository: Repository<TipoAlimento>,
  ) {}

  async create(createTipoAlimentoDto: CreateTipoAlimentoDto) {
    const tipoAlimento = this.tipoAlimentoRepository.create(createTipoAlimentoDto);
    return this.tipoAlimentoRepository.save(tipoAlimento);
  }

  async findAll() {
    return this.tipoAlimentoRepository.find();
  }

  async findOne(id: number) {
    const tipoAlimento = await this.tipoAlimentoRepository.findOne({
      where: { id: id as any },
    });
    if (!tipoAlimento) {
      throw new NotFoundException(`TipoAlimento with id ${id} not found`);
    }
    return tipoAlimento;
  }

  async update(id: number, updateTipoAlimentoDto: UpdateTipoAlimentoDto) {
    const tipoAlimento = await this.findOne(id);
    Object.assign(tipoAlimento, updateTipoAlimentoDto);
    return this.tipoAlimentoRepository.save(tipoAlimento);
  }

  async remove(id: number) {
    const tipoAlimento = await this.findOne(id);
    await this.tipoAlimentoRepository.remove(tipoAlimento);
    return { deleted: true, id };
  }

  getMe(user: any) {
    return {
      message: 'Authenticated user information',
      user,
    };
  }
}
