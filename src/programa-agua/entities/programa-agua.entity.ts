import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Programa } from '../../programa/entities/programa.entity';
import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';

@Entity('programa_agua')
export class ProgramaAgua {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programa_id', type: 'uuid', unique: true })
  programaId!: string;

  @Column({ type: 'text' })
  objetivo!: string;

  @Column({ type: 'text' })
  alcance!: string;

  @Column({ name: 'procedimiento_general', type: 'text' })
  procedimientoGeneral!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @OneToOne(() => Programa)
  @JoinColumn({ name: 'programa_id' })
  programa!: Programa;

  @OneToMany(() => FuenteAgua, (fuenteAgua) => fuenteAgua.programaAgua)
  fuentesAgua!: FuenteAgua[];

  @OneToMany(() => RegistroAgua, (registroAgua) => registroAgua.programaAgua)
  registrosAgua!: RegistroAgua[];
}
