import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';
import { InsumoQuimico } from '../../insumo-quimico/entities/insumo-quimico.entity';
import { EstadoMantenimiento } from '../../modules/agua/shared/enums';

export { EstadoMantenimiento };

@Entity('mantenimiento_lavado')
export class MantenimientoLavado {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid' })
  fuenteAguaId!: string;

  @Column({ name: 'registro_agua_id', type: 'uuid', nullable: true })
  registroAguaId!: string;

  @Column({ name: 'fecha_programada', type: 'date' })
  fechaProgramada!: string;

  @Column({ name: 'fecha_ejecucion', type: 'date', nullable: true })
  fechaEjecucion!: string;

  @Column({ name: 'metodo_limpieza', length: 300 })
  metodoLimpieza!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;

  @Column({
    type: 'enum',
    enum: EstadoMantenimiento,
    default: EstadoMantenimiento.PROGRAMADO,
  })
  estado!: EstadoMantenimiento;

  @Column({ name: 'evidencia_foto', length: 500, nullable: true })
  evidenciaFoto?: string;

  // ─── Campos normativos ───────────────────────────────────────────────────────

  @Column({ name: 'tipo_limpieza', length: 100, nullable: true })
  tipoLimpieza!: string;

  @Column({ name: 'producto_utilizado', length: 200, nullable: true })
  productoUtilizado!: string;

  @Column({ name: 'concentracion_producto', type: 'double precision', nullable: true })
  concentracionProducto!: number;

  @Column({ name: 'tiempo_contacto', type: 'integer', nullable: true })
  tiempoContacto!: number;

  @Column({ name: 'volumen_agua', type: 'double precision', nullable: true })
  volumenAgua!: number;

  @Column({ type: 'text', nullable: true })
  proceso!: string;

  @Column({ length: 200, nullable: true })
  responsable!: string;

  @Column({ name: 'proxima_limpieza', type: 'date', nullable: true })
  proximaLimpieza!: string;

  @Column({ nullable: true })
  cumple!: boolean;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, (fuente) => fuente.mantenimientos)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;

  @OneToMany(() => InsumoQuimico, (insumo) => insumo.mantenimiento)
  insumosQuimicos!: InsumoQuimico[];
}
