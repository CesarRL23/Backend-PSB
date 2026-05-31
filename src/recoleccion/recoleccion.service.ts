import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { Recoleccion } from './entities/recoleccion.entity';
import { RegistroResiduo } from '../registro-residuos/entities/registro-residuo.entity';
import { TipoResiduo } from '../tipo-residuo/entities/tipo-residuo.entity';

@Injectable()
export class RecoleccionService {
  constructor(
    @InjectRepository(Recoleccion)
    private readonly recoleccionRepository: Repository<Recoleccion>,

    @InjectRepository(RegistroResiduo)
    private readonly registroResiduoRepository: Repository<RegistroResiduo>,

    @InjectRepository(TipoResiduo)
    private readonly tipoResiduoRepository: Repository<TipoResiduo>,
  ) {}

  async create(createRecoleccionDto: CreateRecoleccionDto): Promise<Recoleccion> {
    const registroResiduo = await this.registroResiduoRepository.findOne({
      where: { id: createRecoleccionDto.registroResiduoId },
    });
    if (!registroResiduo) throw new NotFoundException('Registro de residuo no encontrado');

    let tipoResiduo: TipoResiduo | undefined = undefined;
    if (createRecoleccionDto.tipoResiduoId) {
      tipoResiduo = await this.tipoResiduoRepository.findOne({
        where: { id: createRecoleccionDto.tipoResiduoId.toString() },
      }) ?? undefined;
      if (!tipoResiduo) throw new NotFoundException('Tipo de residuo no encontrado');
    }

    const { registroResiduoId, tipoResiduoId, ...rest } = createRecoleccionDto;
    const recoleccion = this.recoleccionRepository.create({ ...rest, registroResiduo, tipoResiduo });
    return this.recoleccionRepository.save(recoleccion);
  }

  async findAll(): Promise<Recoleccion[]> {
    return this.recoleccionRepository.find({
      relations: ['tipoResiduo', 'registroResiduo', 'registroResiduo.programaResiduo', 'registroResiduo.programaResiduo.programa'],
    });
  }

  async findOne(id: number): Promise<Recoleccion> {
    const recoleccion = await this.recoleccionRepository.findOne({
      where: { id: id.toString() },
      relations: ['tipoResiduo', 'registroResiduo', 'registroResiduo.programaResiduo', 'registroResiduo.programaResiduo.programa'],
    });
    if (!recoleccion) {
      throw new NotFoundException(`Recolección con id ${id} no encontrada`);
    }
    return recoleccion;
  }

  async update(id: number, updateRecoleccionDto: UpdateRecoleccionDto): Promise<Recoleccion> {
    const recoleccion = await this.findOne(id);
    Object.assign(recoleccion, updateRecoleccionDto);
    return this.recoleccionRepository.save(recoleccion);
  }

  async remove(id: number): Promise<void> {
    const recoleccion = await this.findOne(id);
    await this.recoleccionRepository.remove(recoleccion);
  }
}
