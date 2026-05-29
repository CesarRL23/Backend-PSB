import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvidenciaPlagas } from './entities/evidencia-plagas.entity';
import { CreateEvidenciaPlagasDto } from './dto/create-evidencia-plagas.dto';
import { UpdateEvidenciaPlagasDto } from './dto/update-evidencia-plagas.dto';
 
@Injectable()
export class EvidenciaPlagasService {
  constructor(
    @InjectRepository(EvidenciaPlagas)
    private readonly repo: Repository<EvidenciaPlagas>,
  ) {}
 
  async create(dto: CreateEvidenciaPlagasDto): Promise<EvidenciaPlagas> {
    const entity = this.repo.create({
      tipoArchivo: dto.tipoArchivo,
      urlArchivo: dto.urlArchivo,
      descripcion: dto.descripcion,
      fecha_carga: dto.fecha_carga,
      registroPlagas: { id: dto.registroPlagasId } as any,
    });
    return this.repo.save(entity);
  }
 
  async findAll(): Promise<EvidenciaPlagas[]> {
    return this.repo.find({ relations: ['registroPlagas'] });
  }
 
  async findOne(id: string): Promise<EvidenciaPlagas> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['registroPlagas'],
    });
    if (!entity) throw new NotFoundException(`EvidenciaPlagas #${id} no encontrada`);
    return entity;
  }
 
  async findByRegistro(registroPlagasId: string): Promise<EvidenciaPlagas[]> {
    return this.repo.find({
      where: { registroPlagas: { id: registroPlagasId } },
    });
  }
 
  async update(id: string, dto: UpdateEvidenciaPlagasDto): Promise<EvidenciaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.tipoArchivo && { tipoArchivo: dto.tipoArchivo }),
      ...(dto.urlArchivo && { urlArchivo: dto.urlArchivo }),
      ...(dto.descripcion && { descripcion: dto.descripcion }),
      ...(dto.fecha_carga && { fecha_carga: dto.fecha_carga }),
      ...(dto.registroPlagasId && { registroPlagas: { id: dto.registroPlagasId } }),
    });
    return this.repo.save(entity);
  }
 
  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}