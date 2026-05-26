import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistroResiduoDto } from './dto/create-registro-residuo.dto';
import { UpdateRegistroResiduoDto } from './dto/update-registro-residuo.dto';
import { RegistroResiduo } from './entities/registro-residuo.entity';
import { EstadoRegistro, Registro } from '../registro/entities/registro.entity';
import { Recoleccion } from '../recoleccion/entities/recoleccion.entity';
import { ChecklistResiduo } from '../checklist-residuos/entities/checklist-residuo.entity';

@Injectable()
export class RegistroResiduosService {
  constructor(
    @InjectRepository(RegistroResiduo)
    private readonly registroResiduoRepository: Repository<RegistroResiduo>,
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,
    @InjectRepository(Recoleccion)
    private readonly recoleccionRepository: Repository<Recoleccion>,
    @InjectRepository(ChecklistResiduo)
    private readonly checklistResiduoRepository: Repository<ChecklistResiduo>,
  ) {}

  async create(createRegistroResiduoDto: CreateRegistroResiduoDto): Promise<RegistroResiduo> {
    // 1. Obtener ProgramaResiduo para su programaId
    const prRepo = this.registroResiduoRepository.manager.getRepository('ProgramaResiduo');
    const pr = await prRepo.findOne({
      where: { id: createRegistroResiduoDto.programaResiduoId },
      relations: ['programa']
    });
    if (!pr) {
      throw new NotFoundException(`Programa de residuos con id ${createRegistroResiduoDto.programaResiduoId} no encontrado`);
    }

    // 2. Obtener un usuario de la base de datos
    const userRepo = this.registroResiduoRepository.manager.getRepository('User');
    const firstUser = await userRepo.findOne({ where: {} });
    const usuarioId = firstUser ? firstUser.id : '9a6d4b65-08a7-4b0a-bcf6-3c2f4d8b4b11';

    // 3. Crear Registro base
    const nuevoRegistro = this.registroRepository.create({
      programaId: pr.programaId || (pr.programa ? pr.programa.id : ''),
      usuarioId,
      fecha: createRegistroResiduoDto.fecha ? new Date(createRegistroResiduoDto.fecha) : new Date(),
      observaciones: createRegistroResiduoDto.observaciones || 'Registro creado por residuos',
      estado: createRegistroResiduoDto.estado || EstadoRegistro.PENDIENTE
    });
    const savedRegistro = await this.registroRepository.save(nuevoRegistro);

    // 4. Crear RegistroResiduo
    const registroResiduo = this.registroResiduoRepository.create({
      tipo_actividad: createRegistroResiduoDto.tipo_actividad,
      resultado_general: createRegistroResiduoDto.resultado_general,
      programaResiduoId: createRegistroResiduoDto.programaResiduoId,
      registroId: savedRegistro.id
    });
    const savedRR = await this.registroResiduoRepository.save(registroResiduo);

    // 5. Crear Recolección por defecto si la actividad es recolección
    if (createRegistroResiduoDto.tipo_actividad === 'recoleccion' || createRegistroResiduoDto.tipo_actividad === 'recoleccion_interna') {
      const recoleccion = this.recoleccionRepository.create({
        fecha: createRegistroResiduoDto.fecha ? new Date(createRegistroResiduoDto.fecha) : new Date(),
        responsable: createRegistroResiduoDto.responsable || 'Responsable',
        cantidad_recolectada: 150,
        observaciones: createRegistroResiduoDto.observaciones || 'Generado automáticamente',
        registroResiduoId: savedRR.id
      });
      await this.recoleccionRepository.save(recoleccion);
    }

    // 6. Crear Checklist por defecto
    const items = [
      { titulo: 'Recolección realizada', descripcion: 'Recolección de residuos del área' },
      { titulo: 'Clasificación completada', descripcion: 'Residuos clasificados adecuadamente' },
      { titulo: 'Evidencia cargada', descripcion: 'Registro fotográfico subido' },
      { titulo: 'Transporte autorizado', descripcion: 'Vehículo de transporte autorizado' },
      { titulo: 'Inspección realizada', descripcion: 'Inspección del área completada' }
    ];

    const checklistPromises = items.map((item, i) => {
      const cl = this.checklistResiduoRepository.create({
        titulo: item.titulo,
        descripcion: item.descripcion,
        porcentaje_cumplimiento: i < 2 ? 100 : 0,
        registroResiduoId: savedRR.id
      });
      return this.checklistResiduoRepository.save(cl);
    });
    await Promise.all(checklistPromises);

    return this.findOne(savedRR.id);
  }

  async findAll(): Promise<RegistroResiduo[]> {
    return this.registroResiduoRepository.find({
      relations: ['registro', 'recolecciones', 'checklistResiduo', 'evidencias']
    });
  }

  async findOne(id: string): Promise<RegistroResiduo> {
    const registroResiduo = await this.registroResiduoRepository.findOne({
      where: { id },
      relations: ['registro', 'recolecciones', 'checklistResiduo', 'evidencias']
    });
    if (!registroResiduo) {
      throw new NotFoundException(`Registro de residuo con id ${id} no encontrado`);
    }
    return registroResiduo;
  }

  async update(id: string, updateRegistroResiduoDto: UpdateRegistroResiduoDto): Promise<RegistroResiduo> {
    const registroResiduo = await this.findOne(id);
    const { tipo_actividad, resultado_general, fecha, observaciones, responsable, estado } = updateRegistroResiduoDto as any;

    if (tipo_actividad !== undefined) registroResiduo.tipo_actividad = tipo_actividad;
    if (resultado_general !== undefined) registroResiduo.resultado_general = resultado_general;

    if (registroResiduo.registro) {
      const reg = registroResiduo.registro;
      if (fecha !== undefined) reg.fecha = new Date(fecha);
      if (observaciones !== undefined) reg.observaciones = observaciones;
      if (estado !== undefined) reg.estado = estado;
      await this.registroRepository.save(reg);
    }

    if (tipo_actividad === 'recoleccion' || tipo_actividad === 'recoleccion_interna' || (registroResiduo.recolecciones && registroResiduo.recolecciones.length > 0)) {
      if (registroResiduo.recolecciones && registroResiduo.recolecciones.length > 0) {
        for (const rec of registroResiduo.recolecciones) {
          if (fecha !== undefined) rec.fecha = new Date(fecha);
          if (responsable !== undefined) rec.responsable = responsable;
          if (observaciones !== undefined) rec.observaciones = observaciones;
          await this.recoleccionRepository.save(rec);
        }
      } else {
        const recoleccion = this.recoleccionRepository.create({
          fecha: fecha ? new Date(fecha) : (registroResiduo.registro ? registroResiduo.registro.fecha : new Date()),
          responsable: responsable || 'Responsable',
          cantidad_recolectada: 150,
          observaciones: observaciones || 'Generado automáticamente',
          registroResiduoId: registroResiduo.id
        });
        await this.recoleccionRepository.save(recoleccion);
      }
    }

    await this.registroResiduoRepository.save(registroResiduo);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const registroResiduo = await this.findOne(id);
    const baseRegistroId = registroResiduo.registroId || (registroResiduo.registro ? registroResiduo.registro.id : null);
    
    await this.registroResiduoRepository.remove(registroResiduo);
    
    if (baseRegistroId) {
      await this.registroRepository.delete(baseRegistroId);
    }
  }
}
