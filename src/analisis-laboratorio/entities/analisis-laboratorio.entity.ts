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

  @Column({ name: 'laboratorio_certificado', length: 200 })
  laboratorioCertificado!: string;

  @Column({ name: 'fecha_muestreo', type: 'date' })
  fechaMuestreo!: string;

  @Column({ name: 'fecha_entrega_resultado', type: 'date', nullable: true })
  fechaEntregaResultado?: string;

  @Column({ name: 'responsable_muestra', length: 200 })
  responsableMuestra!: string;

  @Column({ name: 'punto_muestreo', length: 150 })
  puntoMuestreo!: string;

  @Column({ name: 'cloro_residual', type: 'double precision' })
  cloroResidual!: number;

  @Column({ type: 'double precision' })
  ph!: number;

  @Column({ type: 'double precision' })
  turbiedad!: number;

  @Column({ name: 'color_aparente', type: 'double precision' })
  colorAparente!: number;

  @Column({ name: 'coliformes_totales_presentes', default: false })
  coliformesTotalesPresentes!: boolean;

  @Column({ name: 'e_coli_presente', default: false })
  eColiPresente!: boolean;

  @Column({ type: 'double precision', default: 0 })
  mesofilos!: number;

  @Column({ name: 'cumple_norma_fisicoquimica', default: false })
  cumpleNormaFisicoquimica!: boolean;

  @Column({ name: 'cumple_norma_microbiologica', default: false })
  cumpleNormaMicrobiologica!: boolean;

  @Column({ name: 'cumple_norma_general', default: false })
  cumpleNormaGeneral!: boolean;

  @Column({ type: 'double precision', nullable: true })
  irca!: number;

  @Column({ name: 'nivel_riesgo', length: 100, nullable: true })
  nivelRiesgo!: string;

  @Column({ length: 100, nullable: true })
  resultado!: string;

  @Column({ name: 'link_documento_pdf', length: 500, nullable: true })
  linkDocumentoPdf?: string;

  @Column({ name: 'foto_evidencia', length: 500, nullable: true })
  fotoEvidencia?: string;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => FuenteAgua, (fuente) => fuente.analisisLaboratorio)
  @JoinColumn({ name: 'fuente_agua_id' })
  fuenteAgua!: FuenteAgua;

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;
}
