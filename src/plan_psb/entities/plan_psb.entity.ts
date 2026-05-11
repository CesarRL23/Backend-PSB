import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn

} from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';
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

  @ManyToOne(() => Empresa, (empresa) => empresa.planesPsb, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  //@ManyToOne(() => TipoAlimento, (empresa) => empresa.planesPsb, {
   // nullable: false,
    //onDelete: 'CASCADE',
    
  //})
  //@JoinColumn({ name: 'tipo_alimento_id' })
  //tipoAlimento: TipoAlimento;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
