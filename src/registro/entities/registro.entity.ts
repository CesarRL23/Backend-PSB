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
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Notificacion } from '../../notificacion/entities/notificacion.entity';

export enum EstadoRegistro {
  PENDIENTE   = 'pendiente',
  EN_PROCESO  = 'en_proceso',
  COMPLETADO  = 'completado',
  RECHAZADO   = 'rechazado',
}

@Entity('registro')
export class Registro {

  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'programa_id' })
  programaId!: string;

  @Column({ name: 'usuario_id' })
  usuarioId!: string;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ name: 'hora_inicio', type: 'time', nullable: true })
  horaInicio!: string;

  @Column({ name: 'hora_fin', type: 'time', nullable: true })
  horaFin!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;
1
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

  @ManyToOne(() => Usuario, (usuario) => usuario.registros)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.registro)
  notificaciones!: Notificacion[];
}