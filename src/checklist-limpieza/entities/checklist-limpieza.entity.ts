import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RegistroLimpieza } from '../../registro-limpieza/entities/registro-limpieza.entity';
import { PasoLimpieza } from '../../paso-limpieza/entities/paso-limpieza.entity';
import { ProductoQuimico } from '../../producto-quimico/entities/producto-quimico.entity';
import { MedicionPaso } from '../../medicion-paso/entities/medicion-paso.entity';

@Entity('checklist_limpieza')
export class ChecklistLimpieza {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'registro_limpieza_id', type: 'uuid' })
  registroLimpiezaId!: string;

  @Column({ name: 'paso_limpieza_id', type: 'uuid' })
  pasoLimpiezaId!: string;

  @Column({ name: 'producto_correcto', type: 'boolean', default: false })
  productoCorrecto!: boolean;

  @Column({ name: 'concentracion_correcta', type: 'boolean', default: false })
  concentracionCorrecta!: boolean;

  @Column({ name: 'superficie_cubierta', type: 'boolean', default: false })
  superficieCubierta!: boolean;

  @Column({ name: 'tiempo_cumplido', type: 'boolean', default: false })
  tiempoCumplido!: boolean;

  @Column({ length: 50, default: 'pendiente' })
  estado!: string;

  @Column({ type: 'text', nullable: true })
  observacion!: string;

  // ─── Trazabilidad del producto realmente usado ────────────────────────────────

  @Column({ name: 'producto_quimico_id', type: 'uuid', nullable: true })
  productoQuimicoId!: string;

  @Column({ name: 'lote_usado', length: 100, nullable: true })
  loteUsado!: string;

  @Column({ name: 'concentracion_real', type: 'float', nullable: true })
  concentracionReal!: number;

  @Column({ name: 'volumen_preparado_litros', type: 'float', nullable: true })
  volumenPreparadoLitros!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => RegistroLimpieza, (rl) => rl.checklistItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'registro_limpieza_id' })
  registroLimpieza!: RegistroLimpieza;

  @ManyToOne(() => PasoLimpieza, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'paso_limpieza_id' })
  pasoLimpieza!: PasoLimpieza;

  @ManyToOne(() => ProductoQuimico, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'producto_quimico_id' })
  productoQuimico!: ProductoQuimico;

  @OneToMany(() => MedicionPaso, (m) => m.checklistLimpieza)
  mediciones!: MedicionPaso[];
}
