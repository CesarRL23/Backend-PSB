import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MantenimientoLavado } from '../../mantenimiento-lavado/entities/mantenimiento-lavado.entity';

@Entity('insumo_quimico')
export class InsumoQuimico {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'mantenimiento_id', type: 'uuid' })
  mantenimientoId!: string;

  @Column({ length: 200 })
  nombre!: string;

  @Column({ name: 'registro_sanitario_invima', length: 200, nullable: true })
  registroSanitarioInvima!: string;

  @Column({ length: 100, nullable: true })
  lote!: string;

  @Column({ name: 'fecha_vencimiento', type: 'date', nullable: true })
  fechaVencimiento!: string;

  @Column({ type: 'double precision', nullable: true })
  concentracion!: number;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => MantenimientoLavado, (mantenimiento) => mantenimiento.insumosQuimicos)
  @JoinColumn({ name: 'mantenimiento_id' })
  mantenimiento!: MantenimientoLavado;
}