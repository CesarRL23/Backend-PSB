import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RegistroLimpieza } from '../../registro-limpieza/entities/registro-limpieza.entity';
import { PasoLimpieza } from '../../paso-limpieza/entities/paso-limpieza.entity';

@Entity('checklist_limpieza')
export class ChecklistLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'registro_limpieza_id', type: 'uuid' })
  registroLimpiezaId!: string;

  @Column({ name: 'paso_limpieza_id', type: 'uuid' })
  pasoLimpiezaId!: string;

  @Column({ name: 'producto_correcto', type: 'boolean', default: false })
  productoCorrecto!: boolean;

  @Column({ name: 'concentracion_correcta', type: 'boolean', default: false })
  concentracionCorrecta!: boolean;

  @Column({ name: 'superficie_cubierta', type: 'boolean', default: false })
  superficieCubierta!: boolean;

  @Column({ name: 'tiempo_cumplido', type: 'boolean', default: false })
  tiempoCumplido!: boolean;

  @Column({ length: 50, default: 'pendiente' })
  estado!: string;

  @Column({ type: 'text', nullable: true })
  observacion!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => RegistroLimpieza, (rl) => rl.checklistItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'registro_limpieza_id' })
  registroLimpieza!: RegistroLimpieza;

  @ManyToOne(() => PasoLimpieza, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'paso_limpieza_id' })
  pasoLimpieza!: PasoLimpieza;
}
