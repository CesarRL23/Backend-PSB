import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistroResiduoDto } from './dto/create-registro-residuo.dto';
import { UpdateRegistroResiduoDto } from './dto/update-registro-residuo.dto';
import { RegistroResiduo } from './entities/registro-residuo.entity';

@Injectable()
export class RegistroResiduosService {
  constructor(
    @InjectRepository(RegistroResiduo)
    private readonly registroResiduoRepository: Repository<RegistroResiduo>,
  ) {}

  async create(createRegistroResiduoDto: CreateRegistroResiduoDto): Promise<RegistroResiduo> {
    const registroResiduo = this.registroResiduoRepository.create(createRegistroResiduoDto);
    return this.registroResiduoRepository.save(registroResiduo);
  }

  async findAll(): Promise<RegistroResiduo[]> {
    return this.registroResiduoRepository.find();
  }

  async findOne(id: number): Promise<RegistroResiduo> {
    const registroResiduo = await this.registroResiduoRepository.findOneBy({ id: id.toString() });
    if (!registroResiduo) {
      throw new NotFoundException(`Registro de residuo con id ${id} no encontrado`);
    }
    return registroResiduo;
  }

  async update(id: number, updateRegistroResiduoDto: UpdateRegistroResiduoDto): Promise<RegistroResiduo> {
    const registroResiduo = await this.findOne(id);
    Object.assign(registroResiduo, updateRegistroResiduoDto);
    return this.registroResiduoRepository.save(registroResiduo);
  }

  async remove(id: number): Promise<void> {
    const registroResiduo = await this.findOne(id);
    await this.registroResiduoRepository.remove(registroResiduo);
  }
}
