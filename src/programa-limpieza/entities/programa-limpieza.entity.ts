import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Programa } from '../../programa/entities/programa.entity';
import { PasoLimpieza } from '../../paso-limpieza/entities/paso-limpieza.entity';
import { EquipoArea } from '../../equipo-area/entities/equipo-area.entity';

@Entity('programa_limpieza')
export class ProgramaLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programa_id', type: 'uuid' })
  programaId!: string;

  @Column({ name: 'equipo_area_id', type: 'uuid', nullable: true })
  equipoAreaId!: string;

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

  @OneToOne(() => Programa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'programa_id' })
  programa!: Programa;

  @ManyToOne(() => EquipoArea, (ea) => ea.programasLimpieza, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'equipo_area_id' })
  equipoArea!: EquipoArea;

  @OneToMany(() => PasoLimpieza, (paso) => paso.programaLimpieza)
  pasosLimpieza!: PasoLimpieza[];
}
