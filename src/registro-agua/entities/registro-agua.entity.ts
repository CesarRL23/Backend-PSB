import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Registro } from '../../registro/entities/registro.entity';
import { ProgramaAgua } from 'src/programa-agua/entities/programa-agua.entity';

export enum TipoActividadAgua {
  CONTROL_POTABILIDAD = 'control_potabilidad',
  ANALISIS_LABORATORIO = 'analisis_laboratorio',
  MANTENIMIENTO_LAVADO = 'mantenimiento_lavado',
  ACCION_CORRECTIVA = 'accion_correctiva',
}

export enum ResultadoGeneralAgua {
  CONFORME     = 'conforme',
  NO_CONFORME  = 'no_conforme',
  EN_PROCESO   = 'en_proceso',
}

@Entity('registro_agua')
export class RegistroAgua {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'registro_id', type: 'uuid', unique: true })
  registroId!: string;

  @Column({ name: 'programa_agua_id', type: 'uuid' })
  programaAguaId!: string;

  @Column({
    name: 'tipo_actividad',
    type: 'enum',
    enum: TipoActividadAgua,
  })
  tipoActividad!: TipoActividadAgua;

  @Column({
    name: 'resultado_general',
    type: 'enum',
    enum: ResultadoGeneralAgua,
    default: ResultadoGeneralAgua.EN_PROCESO,
  })
  resultadoGeneral!: ResultadoGeneralAgua;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @OneToOne(() => Registro)
  @JoinColumn({ name: 'registro_id' })
  registro!: Registro;

  @ManyToOne(() => ProgramaAgua, () => ProgramaAgua)
  @JoinColumn({ name: 'programa_agua_id' })
  programaAgua!: ProgramaAgua;
}