import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PlanPsb } from '../../plan_psb/entities/plan_psb.entity';
import { Registro } from '../../registro/entities/registro.entity';
import { ProgramaAgua } from 'src/programa-agua/entities/programa-agua.entity';
import { ProgramaLimpieza } from 'src/programa-limpieza/entities/programa-limpieza.entity';
import { ProgramaPlagas } from 'src/programa-plagas/entities/programa-plagas.entity';
import { ProgramaResiduos } from 'src/programa-residuos/entities/programa-residuos.entity';

export enum TipoPrograma {
  LIMPIEZA = 'limpieza',
  PLAGAS = 'plagas',
  AGUA = 'agua',
  RESIDUOS = 'residuos',
}

export enum FrecuenciaPrograma {
  DIARIO = 'diario',
  SEMANAL = 'semanal',
  QUINCENAL = 'quincenal',
  MENSUAL = 'mensual',
  TRIMESTRAL = 'trimestral',
  SEMESTRAL = 'semestral',
  ANUAL = 'anual',
}

@Entity('programa')
export class Programa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'plan_psb_id', type: 'uuid' })
  planPsbId!: string;

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

  @OneToOne(() => PlanPsb, (plan) => plan.programa)
  planPsb!: PlanPsb;

  @OneToMany(() => Registro, (registro) => registro.programa)
  registros!: Registro[];

  @OneToOne(() => ProgramaAgua, (programaAgua) => programaAgua.programa)
  programaAgua!: ProgramaAgua;

  @OneToOne(() => ProgramaLimpieza, (programaLimpieza) => programaLimpieza.programa)
  programaLimpieza!: ProgramaLimpieza;

  @OneToOne(() => ProgramaPlagas, (programaPlagas) => programaPlagas.programa)
  programaPlagas!: ProgramaPlagas;

  @OneToOne(() => ProgramaResiduos, (programaResiduos) => programaResiduos.programa)
  programaResiduos!: ProgramaResiduos;
}
