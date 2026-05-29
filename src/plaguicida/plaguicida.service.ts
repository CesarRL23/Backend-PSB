// ══════════════════════════════════════════════
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaguicida } from './entities/plaguicida.entity';
import { CreatePlaguicidaDto } from './dto/create-plaguicida.dto';
import { UpdatePlaguicidaDto } from './dto/update-plaguicida.dto';
 
@Injectable()
export class PlaguicidaService {
  constructor(
    @InjectRepository(Plaguicida)
    private readonly repo: Repository<Plaguicida>,
  ) {}
 
  async create(dto: CreatePlaguicidaDto): Promise<Plaguicida> {
    const entity = this.repo.create({
      codigoRegistro: dto.codigoRegistro,
      nombreComercial: dto.nombreComercial,
      ingredienteActivo: dto.ingredienteActivo,
      categoriaOms: dto.categoriaOms,
      dosisAplicacion: dto.dosisAplicacion,
      registroIca: dto.registroIca,
      fichaTecnicaUrl: dto.fichaTecnicaUrl,
      programaPlagas: { id: dto.programaPlagasId } as any,
    });
    return this.repo.save(entity);
  }
 
  async findAll(): Promise<Plaguicida[]> {
    return this.repo.find({ relations: ['programaPlagas'] });
  }
 
  async findOne(id: string): Promise<Plaguicida> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['programaPlagas', 'accionesCorrectivasPlagas'],
    });
    if (!entity) throw new NotFoundException(`Plaguicida #${id} no encontrado`);
    return entity;
  }
 
  async findByPrograma(programaPlagasId: string): Promise<Plaguicida[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId } },
    });
  }
 
  async update(id: string, dto: UpdatePlaguicidaDto): Promise<Plaguicida> {
    const entity = await this.findOne(id);
    Object.assign(entity, {
      ...(dto.codigoRegistro && { codigoRegistro: dto.codigoRegistro }),
      ...(dto.nombreComercial && { nombreComercial: dto.nombreComercial }),
      ...(dto.ingredienteActivo && { ingredienteActivo: dto.ingredienteActivo }),
      ...(dto.categoriaOms && { categoriaOms: dto.categoriaOms }),
      ...(dto.dosisAplicacion && { dosisAplicacion: dto.dosisAplicacion }),
      ...(dto.registroIca && { registroIca: dto.registroIca }),
      ...(dto.fichaTecnicaUrl && { fichaTecnicaUrl: dto.fichaTecnicaUrl }),
      ...(dto.programaPlagasId && { programaPlagas: { id: dto.programaPlagasId } }),
    });
    return this.repo.save(entity);
  }
 
  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}