import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn, OneToOne} from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { TipoAlimento } from 'src/tipo-alimento/entities/tipo-alimento.entity';
import { Programa } from '../../programa/entities/programa.entity';

@Entity('plan_psb')
export class PlanPsb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  version: string;

  @Column({ name: 'estado', length: 100 })
  estado: string;

  @Column({ length: 100 })
  nivel_riesgo: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.planesPsb)
  empresa?: Empresa;

  @ManyToOne(() => TipoAlimento, (tipoAlimento) => tipoAlimento.planesPsb)
  tipoAlimento?: TipoAlimento;

  @OneToOne(()=> Programa,(programa)=> programa.planPsb)
  programa?: Programa;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;


  
}
