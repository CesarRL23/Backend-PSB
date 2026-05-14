import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PasoLimpieza } from '../../paso-limpieza/entities/paso-limpieza.entity';
import { ProductoQuimico } from '../../producto-quimico/entities/producto-quimico.entity';

export enum ConcentracionUnidad {
  PPM    = 'ppm',
  PORCENTAJE = '%',
  ML_L   = 'mL/L',
}

@Entity('paso_limpieza_pq')
export class PasoLimpiezaPq {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'paso_limpieza_id', type: 'uuid' })
  pasoLimpiezaId!: string;

  @Column({ name: 'producto_quimico_id', type: 'uuid' })
  productoQuimicoId!: string;

  @Column({ name: 'concentracion_valor', type: 'float' })
  concentracionValor!: number;

  @Column({
    name: 'concentracion_unidad',
    type: 'enum',
    enum: ConcentracionUnidad,
  })
  concentracionUnidad!: ConcentracionUnidad;

  @Column({ name: 'tiempo_contacto_min', type: 'int' })
  tiempoContactoMin!: number;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => PasoLimpieza, (paso) => paso.pasosProductos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'paso_limpieza_id' })
  pasoLimpieza!: PasoLimpieza;

  @ManyToOne(() => ProductoQuimico, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'producto_quimico_id' })
  productoQuimico!: ProductoQuimico;
}
