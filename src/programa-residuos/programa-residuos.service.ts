import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramaResiduoDto } from './dto/create-programa-residuo.dto';
import { UpdateProgramaResiduoDto } from './dto/update-programa-residuo.dto';
import { ProgramaResiduo } from './entities/programa-residuo.entity';
import { Programa } from '../programa/entities/programa.entity';

@Injectable()
export class ProgramaResiduosService {
  constructor(
    @InjectRepository(ProgramaResiduo)
    private readonly programaResiduoRepository: Repository<ProgramaResiduo>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async create(createProgramaResiduoDto: CreateProgramaResiduoDto): Promise<ProgramaResiduo> {
    let programaId = createProgramaResiduoDto.programaId;
    if (!programaId) {
      const planRepo = this.programaRepository.manager.getRepository('PlanPsb');
      const firstPlan = await planRepo.findOne({ where: {} });
      if (!firstPlan) {
        throw new NotFoundException('No se encontró ningún Plan PSB en el sistema para asociar.');
      }
      
      let programaBase = await this.programaRepository.findOne({ where: { planPsbId: firstPlan.id } });
      if (!programaBase) {
        const nuevoPrograma = this.programaRepository.create({
          planPsbId: firstPlan.id,
          nombre: createProgramaResiduoDto.nombre,
          responsable: createProgramaResiduoDto.responsable,
          descripcion: createProgramaResiduoDto.descripcion,
          frecuencia: createProgramaResiduoDto.frecuencia,
        });
        programaBase = await this.programaRepository.save(nuevoPrograma);
      } else {
        programaBase.nombre = createProgramaResiduoDto.nombre;
        programaBase.responsable = createProgramaResiduoDto.responsable;
        programaBase.descripcion = createProgramaResiduoDto.descripcion;
        programaBase.frecuencia = createProgramaResiduoDto.frecuencia;
        programaBase = await this.programaRepository.save(programaBase);
      }
      programaId = programaBase.id;
    }

    const programaResiduo = this.programaResiduoRepository.create({
      ...createProgramaResiduoDto,
      programaId
    });
    const savedPR = await this.programaResiduoRepository.save(programaResiduo);
    return this.findOne(savedPR.id);
  }

  async findAll(): Promise<ProgramaResiduo[]> {
    return this.programaResiduoRepository.find({
      relations: [
        'programa',
        'registros',
        'registros.recolecciones',
        'registros.checklistResiduo',
        'registros.evidencias',
        'registros.registro'
      ],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: string): Promise<ProgramaResiduo> {
    const programaResiduo = await this.programaResiduoRepository.findOne({
      where: { id },
      relations: [
        'programa',
        'registros',
        'registros.recolecciones',
        'registros.checklistResiduo',
        'registros.evidencias',
        'registros.registro'
      ]
    });
    if (!programaResiduo) {
      throw new NotFoundException(`Programa de residuos con id ${id} no encontrado`);
    }
    return programaResiduo;
  }

  async update(id: string, updateProgramaResiduoDto: UpdateProgramaResiduoDto): Promise<ProgramaResiduo> {
    const programaResiduo = await this.findOne(id);
    const { nombre, responsable, frecuencia, descripcion, objetivo, alcance, procedimiento_general } = updateProgramaResiduoDto as any;

    if (programaResiduo.programa) {
      const prog = programaResiduo.programa;
      if (nombre !== undefined) prog.nombre = nombre;
      if (responsable !== undefined) prog.responsable = responsable;
      if (frecuencia !== undefined) prog.frecuencia = frecuencia;
      if (descripcion !== undefined) prog.descripcion = descripcion;
      await this.programaRepository.save(prog);
    }

    if (objetivo !== undefined) programaResiduo.objetivo = objetivo;
    if (alcance !== undefined) programaResiduo.alcance = alcance;
    if (procedimiento_general !== undefined) programaResiduo.procedimiento_general = procedimiento_general;

    await this.programaResiduoRepository.save(programaResiduo);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const programaResiduo = await this.findOne(id);
    await this.programaResiduoRepository.remove(programaResiduo);
  }
}
