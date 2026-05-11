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

import { ProgramaLimpieza } from '../../programa-limpieza/entities/programa-limpieza.entity';
import { PasoLimpiezaPq } from '../../paso-limpieza-pq/entities/paso-limpieza-pq.entity';

@Entity('paso_limpieza')
export class PasoLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programa_limpieza_id', type: 'uuid' })
  programaLimpiezaId!: string;

  @Column({ type: 'int' })
  orden!: number;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ name: 'tipo_accion', length: 100 })
  tipoAccion!: string;

  @Column({ length: 100, nullable: true })
  concentracion!: string;

  @Column({ name: 'tiempo_contacto', length: 100, nullable: true })
  tiempoContacto!: string;

  @Column({ length: 100 })
  frecuencia!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => ProgramaLimpieza, (pl) => pl.pasosLimpieza, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'programa_limpieza_id' })
  programaLimpieza!: ProgramaLimpieza;

  @OneToMany(() => PasoLimpiezaPq, (pq) => pq.pasoLimpieza)
  pasosProductos!: PasoLimpiezaPq[];
}
