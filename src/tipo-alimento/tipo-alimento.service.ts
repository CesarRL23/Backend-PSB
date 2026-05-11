import { Injectable } from '@nestjs/common';
import { CreateTipoAlimentoDto } from './dto/create-tipo-alimento.dto';
import { UpdateTipoAlimentoDto } from './dto/update-tipo-alimento.dto';

@Injectable()
export class TipoAlimentoService {
  create(createTipoAlimentoDto: CreateTipoAlimentoDto) {
    return 'This action adds a new tipoAlimento';
  }

  findAll() {
    return `This action returns all tipoAlimento`;
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
