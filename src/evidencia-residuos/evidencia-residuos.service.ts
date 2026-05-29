import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvidenciaResiduoDto } from './dto/create-evidencia-residuo.dto';
import { UpdateEvidenciaResiduoDto } from './dto/update-evidencia-residuo.dto';
import { EvidenciaResiduo } from './entities/evidencia-residuo.entity';
import { RegistroResiduo } from '../registro-residuos/entities/registro-residuo.entity';

@Injectable()
export class EvidenciaResiduosService {
  constructor(
    @InjectRepository(EvidenciaResiduo)
    private readonly evidenciaResiduoRepository: Repository<EvidenciaResiduo>,
    @InjectRepository(RegistroResiduo)
    private readonly registroResiduoRepository: Repository<RegistroResiduo>,
  ) {}

  async create(createEvidenciaResiduoDto: CreateEvidenciaResiduoDto): Promise<EvidenciaResiduo> {
    await this.ensureRegistroResiduoExists(createEvidenciaResiduoDto.registroResiduoId);

    const evidenciaResiduo = this.evidenciaResiduoRepository.create(createEvidenciaResiduoDto);
    return this.evidenciaResiduoRepository.save(evidenciaResiduo);
  }

  async createWithFile(createEvidenciaResiduoDto: CreateEvidenciaResiduoDto, file: Express.Multer.File): Promise<EvidenciaResiduo> {
    if (!file && !createEvidenciaResiduoDto.url) {
      throw new BadRequestException('Debe adjuntar un archivo o proporcionar una URL para la evidencia');
    }

    const url = file ? `/uploads/evidencias/${file.filename}` : createEvidenciaResiduoDto.url;
    return this.create({
      ...createEvidenciaResiduoDto,
      url
    });
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

  private async ensureRegistroResiduoExists(registroResiduoId: string): Promise<void> {
    const registroResiduo = await this.registroResiduoRepository.findOneBy({ id: registroResiduoId });
    if (!registroResiduo) {
      throw new NotFoundException(`Registro de residuo con id ${registroResiduoId} no encontrado`);
    }
  }
}
