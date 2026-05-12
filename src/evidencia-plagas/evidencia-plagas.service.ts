// ══════════════════════════════════════════════
// evidencia-plagas.service.ts
// ══════════════════════════════════════════════
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

  async findOne(id: number): Promise<EvidenciaPlagas> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['registroPlagas'],
    });
    if (!entity) throw new NotFoundException(`EvidenciaPlagas #${id} no encontrada`);
    return entity;
  }

  async findByRegistro(registroPlagasId: number): Promise<EvidenciaPlagas[]> {
    return this.repo.find({
      where: { registroPlagas: { id: registroPlagasId.toString() } },
    });
  }

  async update(id: number, dto: UpdateEvidenciaPlagasDto): Promise<EvidenciaPlagas> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
