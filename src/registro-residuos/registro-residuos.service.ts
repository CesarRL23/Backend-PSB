import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistroResiduoDto } from './dto/create-registro-residuo.dto';
import { UpdateRegistroResiduoDto } from './dto/update-registro-residuo.dto';
import { RegistroResiduo } from './entities/registro-residuo.entity';
import { ProgramaResiduo } from '../programa-residuos/entities/programa-residuo.entity';

@Injectable()
export class RegistroResiduosService {
  constructor(
    @InjectRepository(RegistroResiduo)
    private readonly registroResiduoRepository: Repository<RegistroResiduo>,

    @InjectRepository(ProgramaResiduo)
    private readonly programaResiduoRepository: Repository<ProgramaResiduo>,
  ) {}

  async create(createRegistroResiduoDto: CreateRegistroResiduoDto): Promise<RegistroResiduo> {
    const programaResiduo = await this.programaResiduoRepository.findOne({
      where: { id: createRegistroResiduoDto.programaResiduoId },
    });
    if (!programaResiduo) throw new NotFoundException('Programa de residuos no encontrado');

    const registroResiduo = this.registroResiduoRepository.create({
      tipo_actividad: createRegistroResiduoDto.tipo_actividad,
      resultado_general: createRegistroResiduoDto.resultado_general,
      programaResiduo,
    });
    return this.registroResiduoRepository.save(registroResiduo);
  }

  async findAll(): Promise<RegistroResiduo[]> {
    return this.registroResiduoRepository.find({ relations: ['programaResiduo'] });
  }

  async findByProgramaResiduo(programaResiduoId: number): Promise<RegistroResiduo[]> {
    return this.registroResiduoRepository.find({
      where: { programaResiduo: { id: programaResiduoId.toString() } },
      relations: ['programaResiduo'],
    });
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
