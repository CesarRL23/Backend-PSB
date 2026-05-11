import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PlanPsb } from '../../plan_psb/entities/plan_psb.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';

@Entity('tipo_alimento')
export class TipoAlimento {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    nombre?: string;

    @Column()
    descripcion?: string;

    @Column()
    nivel_riesgo?: string;


    @ManyToOne(() => Empresa, (empresa) => empresa.tiposAlimento)
    empresa?: Empresa;

    @OneToMany(() => PlanPsb, (planPsb) => planPsb.tipoAlimento)
    planesPsb?: PlanPsb[];
}
