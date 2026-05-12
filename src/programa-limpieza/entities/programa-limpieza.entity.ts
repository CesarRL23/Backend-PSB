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

import { Programa } from '../../programa/entities/programa.entity';
import { PasoLimpieza } from '../../paso-limpieza/entities/paso-limpieza.entity';

@Entity('programa_limpieza')
export class ProgramaLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programa_id', type: 'uuid' })
  programaId!: string;

  @Column({ length: 300 })
  objetivo!: string;

  @Column({ length: 300 })
  alcance!: string;

  @Column({ name: 'procedimiento_general', type: 'text', nullable: true })
  procedimientoGeneral!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @OneToOne(() => Programa)
  @JoinColumn({ name: 'programa_id' })
  programa!: Programa;

  @OneToMany(() => PasoLimpieza, (paso) => paso.programaLimpieza)
  pasosLimpieza!: PasoLimpieza[];
}
