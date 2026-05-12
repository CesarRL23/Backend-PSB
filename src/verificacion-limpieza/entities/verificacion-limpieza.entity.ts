import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RegistroLimpieza } from '../../registro-limpieza/entities/registro-limpieza.entity';
import { User } from '../../users/entities/user.entity';

@Entity('verificacion_limpieza')
export class VerificacionLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'registro_limpieza_id', type: 'uuid' })
  registroLimpiezaId!: string;

  @Column({ length: 100 })
  tipo!: string;

  @Column({ length: 200 })
  resultado!: string;

  @Column({ length: 50, nullable: true })
  unidad!: string;

  @Column({ name: 'limite_aceptable', length: 100, nullable: true })
  limiteAceptable!: string;

  @Column({ name: 'metodo_validacion', type: 'text', nullable: true })
  metodoValidacion!: string;

  @Column({ name: 'responsable_id', type: 'uuid' })
  responsableId!: string;

  @Column({ name: 'fecha_prueba', type: 'date' })
  fechaPrueba!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => RegistroLimpieza, (rl) => rl.verificaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'registro_limpieza_id' })
  registroLimpieza!: RegistroLimpieza;

  @ManyToOne(() => User, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'responsable_id' })
  responsable!: User;
}
