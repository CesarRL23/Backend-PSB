import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';
import { EstadoAccionCorrectiva } from '../../modules/agua/shared/enums';

export { EstadoAccionCorrectiva };

@Entity('accion_correctiva_agua')
export class AccionCorrectivaAgua {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid' })
  fuenteAguaId!: string;

  @Column({ name: 'registro_agua_id', type: 'uuid' })
  registroAguaId!: string;

  @Column({ name: 'descripcion_desviacion', type: 'text' })
  descripcionDesviacion!: string;

  @Column({ name: 'medida_tomada', type: 'text' })
  medidaTomada!: string;

  @Column({ name: 'resultado_verificacion', type: 'text', nullable: true })
  resultadoVerificacion!: string;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ length: 150 })
  responsable!: string;

  @Column({
    type: 'enum',
    enum: EstadoAccionCorrectiva,
    default: EstadoAccionCorrectiva.PENDIENTE,
  })
  estado!: EstadoAccionCorrectiva;

  @Column({ name: 'evidencia_foto', length: 500, nullable: true })
  evidenciaFoto?: string;

  // ─── Campos normativos ───────────────────────────────────────────────────────

  @Column({ name: 'parametro_incumplido', length: 200, nullable: true })
  parametroIncumplido!: string;

  @Column({ name: 'valor_medido', type: 'double precision', nullable: true })
  valorMedido!: number;

  @Column({ name: 'valor_esperado', type: 'double precision', nullable: true })
  valorEsperado!: number;

  @Column({ name: 'causa_raiz', type: 'text', nullable: true })
  causaRaiz!: string;

  @Column({ name: 'accion_inmediata', type: 'text', nullable: true })
  accionInmediata!: string;

  @Column({ name: 'accion_correctiva', type: 'text', nullable: true })
  accionCorrectiva!: string;

  @Column({ name: 'fecha_limite', type: 'date', nullable: true })
  fechaLimite!: string;

  @Column({ name: 'verificacion_eficacia', type: 'text', nullable: true })
  verificacionEficacia!: string;

  @Column({ nullable: true })
  eficaz!: boolean;

  @Column({ name: 'origen', length: 100, nullable: true })
  origen!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, () => FuenteAgua)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;
}
