import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';

@Entity('control_diario_potabilidad')
export class ControlDiarioPotabilidad {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid' })
  fuenteAguaId!: string;

  @Column({ name: 'registro_agua_id', type: 'uuid', nullable: true })
  registroAguaId!: string;

  @Column({ name: 'fecha_hora', type: 'timestamp' })
  fechaHora!: Date;

  @Column({ name: 'cloro_residual', type: 'double precision' })
  cloroResidual!: number;

  @Column({ type: 'double precision' })
  ph!: number;

  @Column({ type: 'double precision' })
  turbiedad!: number;

  @Column({ name: 'color_aparente', type: 'double precision' })
  colorAparente!: number;

  @Column({ type: 'double precision', nullable: true })
  temperatura!: number;

  @Column({ name: 'punto_captacion', length: 300 })
  puntoCaptacion!: string;

  @Column({ name: 'responsable_muestra', length: 200 })
  responsableMuestra!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string;

  @Column({ name: 'cumple_norma', default: false })
  cumpleNorma!: boolean;

  @Column({ name: 'requiere_analisis_laboratorio', default: false })
  requiereAnalisisLaboratorio!: boolean;

  @Column({ name: 'parametro_fuera_rango', type: 'varchar', length: 500, nullable: true })
  parametroFueraRango!: string | null;

  @Column({ name: 'evidencia_foto', length: 500, nullable: true })
  evidenciaFoto?: string;

  // ─── Campos normativos ───────────────────────────────────────────────────────

  @Column({ length: 50, nullable: true })
  olor!: string;

  @Column({ length: 50, nullable: true })
  sabor!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, (fuente) => fuente.controlesDiarios)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;
}
