import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Programa } from '../../programa/entities/programa.entity';
import { User } from '../../users/entities/user.entity';
import { Notification } from '../../notifications/entities/notification.entity';

export enum EstadoRegistro {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  RECHAZADO = 'rechazado',
}

@Entity('registro')
export class Registro {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programa_id', type: 'uuid' })
  programaId!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ type: 'date' })
  fecha!: Date;

  @Column({ name: 'hora_inicio', type: 'time', nullable: true })
  horaInicio!: string;

  @Column({ name: 'hora_fin', type: 'time', nullable: true })
  horaFin!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;

  @Column({ name: 'evidencia_foto', length: 500, nullable: true })
  evidenciaFoto!: string;

  @Column({
    type: 'enum',
    enum: EstadoRegistro,
    default: EstadoRegistro.PENDIENTE,
  })
  estado!: EstadoRegistro;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => Programa, (programa) => programa.registros)
  @JoinColumn({ name: 'programa_id' })
  programa!: Programa;

  @ManyToOne(() => User, () => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: User;

  @OneToMany(() => Notification, () => Notification)
  notificaciones!: Notification[];
}
