import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ChecklistLimpieza } from '../../checklist-limpieza/entities/checklist-limpieza.entity';

export enum TipoParametro {
  TEMPERATURA = 'TEMPERATURA',
  PH          = 'PH',
  CLORO       = 'CLORO',
  ATP         = 'ATP',
}

@Entity('medicion_paso')
export class MedicionPaso {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'checklist_limpieza_id', type: 'uuid' })
  checklistLimpiezaId!: string;

  @Column({ name: 'tipo_parametro', type: 'enum', enum: TipoParametro })
  tipoParametro!: TipoParametro;

  @Column({ type: 'double precision' })
  valor!: number;

  @Column({ length: 20 })
  unidad!: string;

  @Column({ name: 'valor_minimo_esperado', type: 'double precision', nullable: true })
  valorMinimoEsperado!: number;

  @Column({ name: 'valor_maximo_esperado', type: 'double precision', nullable: true })
  valorMaximoEsperado!: number;

  @Column({ type: 'boolean' })
  cumple!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => ChecklistLimpieza, (c) => c.mediciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'checklist_limpieza_id' })
  checklistLimpieza!: ChecklistLimpieza;
}
