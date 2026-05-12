import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FuenteAgua } from '../../fuente-agua/entities/fuente-agua.entity';
import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';

@Entity('analisis_laboratorio')
export class AnalisisLaboratorio {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fuente_agua_id', type: 'uuid' })
  fuenteAguaId!: string;

  @Column({ name: 'registro_agua_id', type: 'uuid', nullable: true })
  registroAguaId!: string;

  @Column({ name: 'numero_certificado', length: 200 })
  numeroCertificado!: string;

  @Column({ name: 'fecha_muestreo', type: 'date' })
  fechaMuestreo!: string;

  @Column({ name: 'coliformes_totales', default: false })
  coliformesTotales!: boolean;

  @Column({ name: 'e_coli', default: false })
  eColi!: boolean;

  @Column({ type: 'double precision', nullable: true })
  mesofilos!: number;

  @Column({ type: 'double precision', nullable: true })
  irca!: number;

  @Column({ name: 'nivel_riesgo', length: 100, nullable: true })
  nivelRiesgo!: string;

  @Column({ length: 100, nullable: true })
  resultado!: string;

  @Column({ name: 'link_documento_pdf', length: 500, nullable: true })
  linkDocumentoPdf!: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, (fuente) => fuente.analisisLaboratorio)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;
}