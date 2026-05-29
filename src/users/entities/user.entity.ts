import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Notification } from '../../notifications/entities/notification.entity';

@Entity('usuario')
export class User {

  // El UUID lo asigna Supabase Auth; no debe ser autogenerado por TypeORM
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ name: 'empresa_id', type: 'uuid' })
  empresaId!: string;

  @Column({ length: 200 })
  nombre!: string;

  @Column({ unique: true, length: 200 })
  email!: string;

  @Column({ length: 50 })
  rol!: string;

  @Column({ length: 50, default: 'activo' })
  estado!: string;

  @Column({ length: 100, nullable: true })
  cargo!: string;

  @Column({ name: 'pin_firma_hash', length: 200, nullable: true })
  pinFirmaHash!: string;

  @Column({ name: 'firma_digitalizada', length: 500, nullable: true })
  firmaDigitalizada!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @OneToMany(() => Notification, (n) => n.usuario)
  notificaciones!: Notification[];
}
