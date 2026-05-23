import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';
import { InsumoQuimico } from '../../insumo-quimico/entities/insumo-quimico.entity';

export enum EstadoMantenimiento {
  PROGRAMADO  = 'programado',
  EN_PROCESO  = 'en_proceso',
  COMPLETADO  = 'completado',
  CANCELADO   = 'cancelado',
}

@Entity('mantenimiento_lavado')
export class MantenimientoLavado {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid' })
  fuenteAguaId!: string;

  @Column({ name: 'registro_agua_id', type: 'uuid', nullable: true })
  registroAguaId!: string;

  @Column({ name: 'fecha_programada', type: 'date' })
  fechaProgramada!: string;

  @Column({ name: 'fecha_ejecucion', type: 'date', nullable: true })
  fechaEjecucion!: string;

  @Column({ name: 'metodo_limpieza', length: 300 })
  metodoLimpieza!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;

  @Column({
    type: 'enum',
    enum: EstadoMantenimiento,
    default: EstadoMantenimiento.PROGRAMADO,
  })
  estado!: EstadoMantenimiento;

  @Column({ name: 'evidencia_foto', length: 500, nullable: true })
  evidenciaFoto?: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, (fuente) => fuente.mantenimientos)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;

  @OneToMany(() => InsumoQuimico, (insumo) => insumo.mantenimiento)
  insumosQuimicos!: InsumoQuimico[];
}