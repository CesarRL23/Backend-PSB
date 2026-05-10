import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notificacion')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  usuario_id!: string;

  @Column({ nullable: true })
  programa_id!: string;

  @Column({ nullable: true })
  registro_id!: string;

  @Column()
  tipo!: string;

  @Column()
  titulo!: string;

  @Column('text')
  mensaje!: string;

  @Column({ type: 'timestamp' })
  fecha_envio!: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_limite!: Date;

  @Column({ default: false })
  leida!: boolean;

  @Column({ default: 'pendiente' })
  estado!: string;
}