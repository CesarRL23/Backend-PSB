import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Registro } from '../../registro/entities/registro.entity';
import { ProgramaLimpieza } from '../../programa-limpieza/entities/programa-limpieza.entity';
import { ChecklistLimpieza } from '../../checklist-limpieza/entities/checklist-limpieza.entity';
import { VerificacionLimpieza } from '../../verificacion-limpieza/entities/verificacion-limpieza.entity';

@Entity('registro_limpieza')
export class RegistroLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'registro_id', type: 'uuid' })
  registroId!: string;

  @Column({ name: 'programa_limpieza_id', type: 'uuid' })
  programaLimpiezaId!: string;

  @Column({ name: 'superficie_limpiada', length: 300 })
  superficieLimpiada!: string;

  @Column({ name: 'resultado_inspeccion', length: 100, nullable: true })
  resultadoInspeccion!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => Registro, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'registro_id' })
  registro!: Registro;

  @ManyToOne(() => ProgramaLimpieza, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'programa_limpieza_id' })
  programaLimpieza!: ProgramaLimpieza;

  @OneToMany(() => ChecklistLimpieza, (c) => c.registroLimpieza)
  checklistItems!: ChecklistLimpieza[];

  @OneToMany(() => VerificacionLimpieza, (v) => v.registroLimpieza)
  verificaciones!: VerificacionLimpieza[];
}
