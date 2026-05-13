import { ProgramaResiduo } from "src/programa-residuos/entities/programa-residuo.entity";
import { Residuo } from "src/residuo/entities/residuo.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_residuo')
export class TipoResiduo {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    nombre!: string;

    @Column()
    color_contenedor!: string;

    @Column()
    descripcion!: string;

    @Column()
    es_peligroso!: boolean; 

    @ManyToOne(() => ProgramaResiduo, programaResiduo => programaResiduo.tipoResiduos)
    programaResiduo!: ProgramaResiduo;

    @OneToMany(() => Residuo , residuo => residuo.tipoResiduo)
    residuos!: Residuo[];

}