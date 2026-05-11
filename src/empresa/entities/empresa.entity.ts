import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { PlanPsb } from '../../plan_psb/entities/plan_psb.entity';
import { TipoAlimento } from '../../tipo-alimento/entities/tipo-alimento.entity';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  nit: string;

  @Column({ name: 'nombre', length: 200 })
  nombre: string;

  @Column({ length: 300 })
  direccion: string;

  @Column({ name: 'tipo_negocio', length: 100 })
  tipoNegocio: string;

  @Column({ length: 100 })
  representante: string;

  @OneToMany(() => PlanPsb, (planPsb) => planPsb.empresa)
  planesPsb: PlanPsb[];

  @OneToMany(() => TipoAlimento, (tipoAlimento) => tipoAlimento.empresa)
  tiposAlimento: TipoAlimento[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
