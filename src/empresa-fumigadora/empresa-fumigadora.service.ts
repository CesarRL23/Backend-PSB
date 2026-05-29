// ══════════════════════════════════════════════
// empresa-fumigadora.service.ts
// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpresaFumigadora } from './entities/empresa-fumigadora.entity';
import { CreateEmpresaFumigadoraDto } from './dto/create-empresa-fumigadora.dto';
import { UpdateEmpresaFumigadoraDto } from './dto/update-empresa-fumigadora.dto';

@Injectable()
export class EmpresaFumigadoraService {
  constructor(
    @InjectRepository(EmpresaFumigadora)
    private readonly repo: Repository<EmpresaFumigadora>,
  ) {}

  async create(dto: CreateEmpresaFumigadoraDto): Promise<EmpresaFumigadora> {
    const entity = this.repo.create({
      nit: dto.nit,
      nombre_empresa: dto.nombre_empresa,
      numCerSanitario: dto.numCerSanitario,
      registroSds: dto.registroSds,
      telefonoContacto: dto.telefonoContacto,
      fechaVencCer: dto.fechaVencCer,
      programaPlagas: { id: dto.programaPlagasId } as any,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<EmpresaFumigadora[]> {
    return this.repo.find({ relations: ['programaPlagas'] });
  }

  async findOne(id: number): Promise<EmpresaFumigadora> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['programaPlagas'],
    });
    if (!entity) throw new NotFoundException(`EmpresaFumigadora #${id} no encontrada`);
    return entity;
  }

  async findByPrograma(programaPlagasId: number): Promise<EmpresaFumigadora[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId.toString() } },
    });
  }

  // Verifica si el certificado sanitario está vigente
  async certificadoVigente(id: number): Promise<{ vigente: boolean; fechaVencimiento: Date }> {
    const entity = await this.findOne(id);
    const vigente = new Date(entity.fechaVencCer) > new Date();
    return { vigente, fechaVencimiento: entity.fechaVencCer };
  }

  async update(id: number, dto: UpdateEmpresaFumigadoraDto): Promise<EmpresaFumigadora> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
