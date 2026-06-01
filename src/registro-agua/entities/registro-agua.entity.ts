import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Registro } from '../../registro/entities/registro.entity';
import { ProgramaAgua } from 'src/programa-agua/entities/programa-agua.entity';
import {
  TipoActividadAgua,
  ResultadoGeneralAgua,
} from '../../modules/agua/shared/enums';

export { TipoActividadAgua, ResultadoGeneralAgua };

@Entity('registro_agua')
export class RegistroAgua {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'registro_id', type: 'uuid', unique: true })
  registroId!: string;

  @Column({ name: 'programa_agua_id', type: 'uuid' })
  programaAguaId!: string;

  @Column({
    name: 'tipo_actividad',
    type: 'enum',
    enum: TipoActividadAgua,
  })
  tipoActividad!: TipoActividadAgua;

  @Column({
    name: 'resultado_general',
    type: 'enum',
    enum: ResultadoGeneralAgua,
    default: ResultadoGeneralAgua.EN_PROCESO,
  })
  resultadoGeneral!: ResultadoGeneralAgua;

  // ─── Campos normativos ───────────────────────────────────────────────────────

  @Column({ length: 100, nullable: true })
  periodo!: string;

  @Column({ length: 200, nullable: true })
  responsable!: string;

  @Column({ name: 'porcentaje_cumplimiento', type: 'double precision', nullable: true })
  porcentajeCumplimiento!: number;

  @Column({ type: 'text', nullable: true })
  reporte!: string;

  @Column({ name: 'fecha_cierre', type: 'date', nullable: true })
  fechaCierre!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @OneToOne(() => Registro)
  @JoinColumn({ name: 'registro_id' })
  registro!: Registro;

  @ManyToOne(() => ProgramaAgua, () => ProgramaAgua)
  @JoinColumn({ name: 'programa_agua_id' })
  programaAgua!: ProgramaAgua;
}
