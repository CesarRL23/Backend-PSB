import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RegistroAgua } from '../../registro-agua/entities/registro-agua.entity';

export enum EstadoAccionCorrectiva {
  PENDIENTE   = 'pendiente',
  EN_PROCESO  = 'en_proceso',
  COMPLETADA  = 'completada',
  CANCELADA   = 'cancelada',
}

@Entity('accion_correctiva_agua')
export class AccionCorrectivaAgua {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => RegistroAgua, () => RegistroAgua)
  @JoinColumn({ name: 'registro_agua_id' })
  registroAgua!: RegistroAgua;
  

}