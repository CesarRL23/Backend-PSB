import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PlanPsb } from '../../plan_psb/entities/plan_psb.entity';
import { Registro } from '../../registro/entities/registro.entity';

export enum TipoPrograma {
  LIMPIEZA = 'limpieza',
  PLAGAS   = 'plagas',
  AGUA     = 'agua',
  RESIDUOS = 'residuos',
}

export enum FrecuenciaPrograma {
  DIARIO     = 'diario',
  SEMANAL    = 'semanal',
  QUINCENAL  = 'quincenal',
  MENSUAL    = 'mensual',
  TRIMESTRAL = 'trimestral',
  SEMESTRAL  = 'semestral',
  ANUAL      = 'anual',
}

@Entity('programa')
export class Programa {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'plan_psb_id' })
  planPsbId!: number;

  @Column({ type: 'enum', enum: TipoPrograma })
  tipo!: TipoPrograma;

  @Column({ length: 200 })
  nombre!: string;

  @Column({ length: 150 })
  responsable!: string;

  @Column({ type: 'enum', enum: FrecuenciaPrograma })
  frecuencia!: FrecuenciaPrograma;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => PlanPsb, (plan) => plan.programas)
  @JoinColumn({ name: 'plan_psb_id' })
  planPsb!: PlanPsb;

  @OneToMany(() => Registro, (registro) => registro.programa)
  registros!: Registro[];
}