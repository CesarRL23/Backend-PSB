import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';

@Entity('control_diario_potabilidad')
export class ControlDiarioPotabilidad {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid' })
  fuenteAguaId!: string;

  @Column({ name: 'registro_agua_id', type: 'uuid', nullable: true })
  registroAguaId!: string;

  @Column({ name: 'fecha_hora', type: 'timestamp' })
  fechaHora!: Date;

  @Column({ name: 'cloro_residual', type: 'double precision' })
  cloroResidual!: number;

  @Column({ type: 'double precision' })
  ph!: number;

  @Column({ type: 'double precision' })
  turbiedad!: number;

  @Column({ name: 'cumple_norma', default: false })
  cumpleNorma!: boolean;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, (fuente) => fuente.controlesDiarios)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;
}