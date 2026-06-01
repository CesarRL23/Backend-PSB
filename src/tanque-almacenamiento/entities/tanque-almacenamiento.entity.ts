import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';

@Entity('tanque_almacenamiento')
export class TanqueAlmacenamiento {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid', unique: true })
  fuenteAguaId!: string;

  @Column({ name: 'capacidad_litros', type: 'double precision' })
  capacidadLitros!: number;

  @Column({ name: 'material_grado_alimenticio', length: 200 })
  materialGradoAlimenticio!: string;

  @Column({ name: 'fecha_ultimo_lavado', type: 'date', nullable: true })
  fechaUltimoLavado!: string;

  @Column({ name: 'tiene_tapa', default: false })
  tieneTapa!: boolean;

  // ─── Campos normativos ───────────────────────────────────────────────────────

  @Column({ length: 100, nullable: true })
  tipo!: string;

  @Column({ length: 300, nullable: true })
  ubicacion!: string;

  @Column({ name: 'tapa_buen_estado', nullable: true })
  tapaBuenEstado!: boolean;

  @Column({ name: 'llave_paso', nullable: true })
  llavePaso!: boolean;

  @Column({ name: 'proxima_limpieza', type: 'date', nullable: true })
  proximaLimpieza!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @OneToOne(() => FuenteAgua, (fuente) => fuente.tanqueAlmacenamiento)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;
}
