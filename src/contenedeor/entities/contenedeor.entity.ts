import { ProgramaResiduo } from "src/programa-residuos/entities/programa-residuo.entity";
import { Residuo } from "src/residuo/entities/residuo.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('contenedeor')
export class Contenedeor {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    color!: string;

    @Column()
    capacidad!: string;

    @Column()
    ubicacion!: string;

    @Column()
    estado!: string;

    
    @ManyToOne(() => ProgramaResiduo, programaResiduo => programaResiduo.contenedeor)
    programaResiduo!: ProgramaResiduo;

    @OneToMany(() => Residuo , residuo => residuo.contenedeor)
    residuos!: Residuo[];
}
