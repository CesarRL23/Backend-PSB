import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { Recoleccion } from './entities/recoleccion.entity';
import { RegistroResiduo } from 'src/registro-residuos/entities/registro-residuo.entity';
import { TipoResiduo } from 'src/tipo-residuo/entities/tipo-residuo.entity';

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
    // Validar que el registro existe
    const registro = await this.registroResiduoRepository.findOne({
      where: { id: createRecoleccionDto.registroResiduoId }
    });
    
    if (!registro) {
      throw new BadRequestException('El registro de residuo especificado no existe');
    }

    // Validar que el tipo de residuo existe (si se proporciona)
    if (createRecoleccionDto.tipoResiduoId) {
      const tipoResiduo = await this.tipoResiduoRepository.findOne({
        where: { id: createRecoleccionDto.tipoResiduoId.toString() }
      });
      
      if (!tipoResiduo) {
        throw new BadRequestException('El tipo de residuo especificado no existe');
      }
    }

    const recoleccion = this.recoleccionRepository.create({
      ...createRecoleccionDto,
      tipoResiduoId: createRecoleccionDto.tipoResiduoId?.toString()
    });
    return this.recoleccionRepository.save(recoleccion);
  }

  async findAll(): Promise<Recoleccion[]> {
    return this.recoleccionRepository.find({
      relations: ['registroResiduo', 'tipoResiduo', 'registroResiduo.programaResiduo', 'registroResiduo.programaResiduo.programa']
    });
  }

  async findOne(id: number): Promise<Recoleccion> {
    const recoleccion = await this.recoleccionRepository.findOne({
      where: { id: id.toString() },
      relations: ['registroResiduo', 'tipoResiduo', 'registroResiduo.programaResiduo', 'registroResiduo.programaResiduo.programa']
    });
    if (!recoleccion) {
      throw new NotFoundException(`Recolección con id ${id} no encontrada`);
    }
    return recoleccion;
  }

  async update(id: number, updateRecoleccionDto: UpdateRecoleccionDto): Promise<Recoleccion> {
    const recoleccion = await this.findOne(id);
    
    // Validar tipo de residuo si se actualiza
    if (updateRecoleccionDto.tipoResiduoId) {
      const tipoResiduo = await this.tipoResiduoRepository.findOne({
        where: { id: updateRecoleccionDto.tipoResiduoId.toString() }
      });
      
      if (!tipoResiduo) {
        throw new BadRequestException('El tipo de residuo especificado no existe');
      }
    }

    Object.assign(recoleccion, {
      ...updateRecoleccionDto,
      tipoResiduoId: updateRecoleccionDto.tipoResiduoId?.toString()
    });
    return this.recoleccionRepository.save(recoleccion);
  }

  async remove(id: number): Promise<void> {
    const recoleccion = await this.findOne(id);
    await this.recoleccionRepository.remove(recoleccion);
  }

  /**
   * Obtiene tipos de residuos disponibles para un programa específico
   */
  async getTiposResiduoByPrograma(programaResiduoId: string): Promise<TipoResiduo[]> {
    return this.tipoResiduoRepository.find({
      where: { programaResiduo: { id: programaResiduoId } }
    });
  }
}
