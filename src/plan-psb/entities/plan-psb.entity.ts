import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('plan_psb')
export class PlanPsb {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    version?: string;

    @Column()
    estado?: string;

    @Column()
    nivel_riesgo?: string;

    @Column()
    fecha_creacion?: Date;
    
    @Column()
    fecha_modificacion?: Date;
    

}
