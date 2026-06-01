import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChecklistResiduoDto } from './dto/create-checklist-residuo.dto';
import { UpdateChecklistResiduoDto } from './dto/update-checklist-residuo.dto';
import { ChecklistResiduo } from './entities/checklist-residuo.entity';
import { RegistroResiduo } from 'src/registro-residuos/entities/registro-residuo.entity';

@Injectable()
export class ChecklistResiduosService {
  constructor(
    @InjectRepository(ChecklistResiduo)
    private readonly checklistResiduoRepository: Repository<ChecklistResiduo>,
    @InjectRepository(RegistroResiduo)
    private readonly registroResiduoRepository: Repository<RegistroResiduo>,
  ) {}

  async create(createChecklistResiduoDto: CreateChecklistResiduoDto): Promise<ChecklistResiduo> {
    const { registroResiduoId, ...rest } = createChecklistResiduoDto;
    const registro = await this.registroResiduoRepository.findOneBy({ id: registroResiduoId });
    if (!registro) {
      throw new NotFoundException(`RegistroResiduo con id ${registroResiduoId} no encontrado`);
    }
    const checklist = this.checklistResiduoRepository.create({
      ...rest,
      registroResiduo: registro,
    });
    return this.checklistResiduoRepository.save(checklist);
  }

  async findAll(): Promise<ChecklistResiduo[]> {
    return this.checklistResiduoRepository.find();
  }

  async findOne(id: string): Promise<ChecklistResiduo> {
    const checklistResiduo = await this.checklistResiduoRepository.findOneBy({ id });
    if (!checklistResiduo) {
      throw new NotFoundException(`Checklist de residuo con id ${id} no encontrado`);
    }
    return checklistResiduo;
  }

  async update(id: string, updateChecklistResiduoDto: UpdateChecklistResiduoDto): Promise<ChecklistResiduo> {
    const checklistResiduo = await this.findOne(id);
    Object.assign(checklistResiduo, updateChecklistResiduoDto);
    return this.checklistResiduoRepository.save(checklistResiduo);
  }

  async remove(id: string): Promise<void> {
    const checklistResiduo = await this.findOne(id);
    await this.checklistResiduoRepository.remove(checklistResiduo);
  }
}
