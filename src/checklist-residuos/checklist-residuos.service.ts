import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChecklistResiduoDto } from './dto/create-checklist-residuo.dto';
import { UpdateChecklistResiduoDto } from './dto/update-checklist-residuo.dto';
import { ChecklistResiduo } from './entities/checklist-residuo.entity';

@Injectable()
export class ChecklistResiduosService {
  constructor(
    @InjectRepository(ChecklistResiduo)
    private readonly checklistResiduoRepository: Repository<ChecklistResiduo>,
  ) {}

  async create(createChecklistResiduoDto: CreateChecklistResiduoDto): Promise<ChecklistResiduo> {
    const checklistResiduo = this.checklistResiduoRepository.create(createChecklistResiduoDto);
    return this.checklistResiduoRepository.save(checklistResiduo);
  }

  async findAll(): Promise<ChecklistResiduo[]> {
    return this.checklistResiduoRepository.find();
  }

  async findOne(id: number): Promise<ChecklistResiduo> {
    const checklistResiduo = await this.checklistResiduoRepository.findOneBy({ id: id.toString() });
    if (!checklistResiduo) {
      throw new NotFoundException(`Checklist de residuo con id ${id} no encontrada`);
    }
    return checklistResiduo;
  }

  async update(id: number, updateChecklistResiduoDto: UpdateChecklistResiduoDto): Promise<ChecklistResiduo> {
    const checklistResiduo = await this.findOne(id);
    Object.assign(checklistResiduo, updateChecklistResiduoDto);
    return this.checklistResiduoRepository.save(checklistResiduo);
  }

  async remove(id: number): Promise<void> {
    const checklistResiduo = await this.findOne(id);
    await this.checklistResiduoRepository.remove(checklistResiduo);
  }
}
