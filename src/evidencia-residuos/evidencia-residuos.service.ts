import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvidenciaResiduoDto } from './dto/create-evidencia-residuo.dto';
import { UpdateEvidenciaResiduoDto } from './dto/update-evidencia-residuo.dto';
import { EvidenciaResiduo } from './entities/evidencia-residuo.entity';

@Injectable()
export class EvidenciaResiduosService {
  constructor(
    @InjectRepository(EvidenciaResiduo)
    private readonly evidenciaResiduoRepository: Repository<EvidenciaResiduo>,
  ) {}

  async create(createEvidenciaResiduoDto: CreateEvidenciaResiduoDto): Promise<EvidenciaResiduo> {
    const evidenciaResiduo = this.evidenciaResiduoRepository.create(createEvidenciaResiduoDto);
    return this.evidenciaResiduoRepository.save(evidenciaResiduo);
  }

  async findAll(): Promise<EvidenciaResiduo[]> {
    return this.evidenciaResiduoRepository.find();
  }

  async findOne(id: number): Promise<EvidenciaResiduo> {
    const evidenciaResiduo = await this.evidenciaResiduoRepository.findOneBy({ id });
    if (!evidenciaResiduo) {
      throw new NotFoundException(`Evidencia de residuo con id ${id} no encontrada`);
    }
    return evidenciaResiduo;
  }

  async update(id: number, updateEvidenciaResiduoDto: UpdateEvidenciaResiduoDto): Promise<EvidenciaResiduo> {
    const evidenciaResiduo = await this.findOne(id);
    Object.assign(evidenciaResiduo, updateEvidenciaResiduoDto);
    return this.evidenciaResiduoRepository.save(evidenciaResiduo);
  }

  async remove(id: number): Promise<void> {
    const evidenciaResiduo = await this.findOne(id);
    await this.evidenciaResiduoRepository.remove(evidenciaResiduo);
  }
}
