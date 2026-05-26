import { Injectable } from '@nestjs/common';
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

  create(createTipoAlimentoDto: CreateTipoAlimentoDto) {
    return 'This action adds a new tipoAlimento';
  }

  findAll() {
    return this.tipoAlimentoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoAlimento`;
  }

  update(id: number, updateTipoAlimentoDto: UpdateTipoAlimentoDto) {
    return `This action updates a #${id} tipoAlimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoAlimento`;
  }
}
