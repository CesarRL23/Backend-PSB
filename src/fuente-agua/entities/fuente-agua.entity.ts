import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProgramaAgua } from '../../programa-agua/entities/programa-agua.entity';
import { TanqueAlmacenamiento } from '../../tanque-almacenamiento/entities/tanque-almacenamiento.entity';
import { ControlDiarioPotabilidad } from '../../control-diario-potabilidad/entities/control-diario-potabilidad.entity';
import { AnalisisLaboratorio } from '../../analisis-laboratorio/entities/analisis-laboratorio.entity';
import { MantenimientoLavado } from '../../mantenimiento-lavado/entities/mantenimiento-lavado.entity';

@Entity('fuente_agua')
export class FuenteAgua {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programa_agua_id', type: 'uuid' })
  programaAguaId!: string;

  @Column({ length: 200 })
  nombre!: string;

  @Column({ length: 100 })
  tipo!: string;

  @Column({ length: 200, nullable: true })
  proveedor!: string;

  @Column({ length: 300, nullable: true })
  ubicacion!: string;

  @Column({ name: 'requiere_tanque', default: false })
  requiereTanque!: boolean;

  @Column({ length: 100, default: 'activo' })
  estado!: string;

  // ─── Campos normativos (Res. 2115/2007) ──────────────────────────────────────

  @Column({ length: 150, nullable: true })
  municipio!: string;

  @Column({ length: 150, nullable: true })
  departamento!: string;

  @Column({ length: 200, nullable: true })
  concesion!: string;

  @Column({ length: 200, nullable: true })
  tratamiento!: string;

  @Column({ name: 'evidencia_foto', length: 500, nullable: true })
  evidenciaFoto?: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => ProgramaAgua, (programaAgua) => programaAgua.fuentesAgua)
  @JoinColumn({ name: 'programa_agua_id' })
  programaAgua!: ProgramaAgua;

  @OneToOne(() => TanqueAlmacenamiento, (tanque) => tanque.fuenteAgua)
  tanqueAlmacenamiento!: TanqueAlmacenamiento;

  @OneToMany(() => ControlDiarioPotabilidad, (control) => control.fuenteAgua)
  controlesDiarios!: ControlDiarioPotabilidad[];

  @OneToMany(() => AnalisisLaboratorio, (analisis) => analisis.fuenteAgua)
  analisisLaboratorio!: AnalisisLaboratorio[];

  @OneToMany(() => MantenimientoLavado, (mantenimiento) => mantenimiento.fuenteAgua)
  mantenimientos!: MantenimientoLavado[];
}
