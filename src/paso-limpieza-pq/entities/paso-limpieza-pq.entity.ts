import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PasoLimpieza } from '../../paso-limpieza/entities/paso-limpieza.entity';
import { ProductoQuimico } from '../../producto-quimico/entities/producto-quimico.entity';

@Entity('paso_limpieza_pq')
export class PasoLimpiezaPq {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'paso_limpieza_id', type: 'uuid' })
  pasoLimpiezaId!: string;

  @Column({ name: 'producto_quimico_id', type: 'uuid' })
  productoQuimicoId!: string;

  @Column({ length: 100, nullable: true })
  concentracion!: string;

  @Column({ name: 'tiempo_contacto', length: 100, nullable: true })
  tiempoContacto!: string;

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
