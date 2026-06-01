import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramaResiduoDto } from './dto/create-programa-residuo.dto';
import { UpdateProgramaResiduoDto } from './dto/update-programa-residuo.dto';
import { ProgramaResiduo } from './entities/programa-residuo.entity';

@Injectable()
export class ProgramaResiduosService {
  constructor(
    @InjectRepository(ProgramaResiduo)
    private readonly programaResiduoRepository: Repository<ProgramaResiduo>,
  ) {}

  async create(createProgramaResiduoDto: CreateProgramaResiduoDto): Promise<ProgramaResiduo> {
    const programaResiduo = this.programaResiduoRepository.create(createProgramaResiduoDto);
    return this.programaResiduoRepository.save(programaResiduo);
  }

  async findAll(): Promise<ProgramaResiduo[]> {
    return this.programaResiduoRepository.find({
      relations: [
        'programa',
        'tipoResiduos',
        'areaGenereacion',
        'contenedeor',
        'residuos',
        'registros',
        'registros.registro',
        'registros.recolecciones',
        'registros.checklistResiduo',
        'registros.evidencias'
      ]
    });
  }

  async findOne(id: number): Promise<ProgramaResiduo> {
    const programaResiduo = await this.programaResiduoRepository.findOne({
      where: { id: id.toString() },
      relations: [
        'programa',
        'tipoResiduos',
        'areaGenereacion',
        'contenedeor',
        'residuos',
        'registros',
        'registros.registro',
        'registros.recolecciones',
        'registros.checklistResiduo',
        'registros.evidencias'
      ]
    });
    if (!programaResiduo) {
      throw new NotFoundException(`Programa de residuos con id ${id} no encontrado`);
    }
    return programaResiduo;
  }

  async update(id: number, updateProgramaResiduoDto: UpdateProgramaResiduoDto): Promise<ProgramaResiduo> {
    const programaResiduo = await this.findOne(id);
    Object.assign(programaResiduo, updateProgramaResiduoDto);
    return this.programaResiduoRepository.save(programaResiduo);
  }

  async remove(id: number): Promise<void> {
    const programaResiduo = await this.findOne(id);
    await this.programaResiduoRepository.remove(programaResiduo);
  }
}
