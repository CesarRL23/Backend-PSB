import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('notificacion')
export class Notification {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'programa_id', type: 'uuid', nullable: true })
  programaId!: string;

  @Column({ name: 'registro_id', type: 'uuid', nullable: true })
  registroId!: string;

  @Column({ length: 50 })
  tipo!: string;

  @Column({ length: 200 })
  titulo!: string;

  @Column({ type: 'text' })
  mensaje!: string;

  @Column({ name: 'fecha_envio', type: 'timestamp' })
  fechaEnvio!: Date;

  @Column({ name: 'fecha_limite', type: 'timestamp', nullable: true })
  fechaLimite!: Date;

  @Column({ default: false })
  leida!: boolean;

  @Column({ length: 50, default: 'pendiente' })
  estado!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => User, (u) => u.notificaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: User;

  // programa y registro se relacionan desde sus propios módulos (otro compañero)
}
