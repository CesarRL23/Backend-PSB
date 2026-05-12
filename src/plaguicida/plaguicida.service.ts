// ══════════════════════════════════════════════
// plaguicida.service.ts
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

  async findOne(id: number): Promise<Plaguicida> {
    const entity = await this.repo.findOne({
      where: { id: id.toString() },
      relations: ['programaPlagas', 'accionesCorrectivasPlagas'],
    });
    if (!entity) throw new NotFoundException(`Plaguicida #${id} no encontrado`);
    return entity;
  }

  async findByPrograma(programaPlagasId: number): Promise<Plaguicida[]> {
    return this.repo.find({
      where: { programaPlagas: { id: programaPlagasId.toString() } },
    });
  }

  async update(id: number, dto: UpdatePlaguicidaDto): Promise<Plaguicida> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
