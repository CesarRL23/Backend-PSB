import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductoQuimico } from './entities/producto-quimico.entity';
import { CreateProductoQuimicoDto } from './dto/create-producto-quimico.dto';
import { UpdateProductoQuimicoDto } from './dto/update-producto-quimico.dto';

@Injectable()
export class ProductoQuimicoService {

  constructor(
    @InjectRepository(ProductoQuimico)
    private readonly repo: Repository<ProductoQuimico>,
  ) {}

  // ─── Crear ───────────────────────────────────────────────────────────────────

  async create(dto: CreateProductoQuimicoDto): Promise<ProductoQuimico> {
    const existente = await this.repo.findOne({
      where: { codigo: dto.codigo },
    });

    if (existente) {
      throw new ConflictException(
        `Ya existe un producto químico con el código "${dto.codigo}"`,
      );
    }

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  // ─── Listar ──────────────────────────────────────────────────────────────────

  async findAll(): Promise<ProductoQuimico[]> {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  // ─── Buscar uno ──────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<ProductoQuimico> {
    const entity = await this.repo.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`ProductoQuimico #${id} no encontrado`);
    }

    return entity;
  }

  // ─── Actualizar ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateProductoQuimicoDto): Promise<ProductoQuimico> {
    const entity = await this.findOne(id);

    if (dto.codigo && dto.codigo !== entity.codigo) {
      const conflicto = await this.repo.findOne({ where: { codigo: dto.codigo } });
      if (conflicto) {
        throw new ConflictException(
          `Ya existe un producto químico con el código "${dto.codigo}"`,
        );
      }
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  // ─── Eliminar ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
