import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { ProgramaResiduo } from "src/programa-residuos/entities/programa-residuo.entity";
import { Residuo } from "src/residuo/entities/residuo.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('area_genereacion')
export class AreaGenereacion {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    nombre!: string;

    @Column()
    descripcion!: string;

    @ManyToOne(() => ProgramaResiduo, programaResiduo => programaResiduo.areaGenereacion)
    programaResiduo!: ProgramaResiduo;


    @OneToMany(() => Residuo, residuo => residuo.areaGenereacion)
    residuos!: Residuo[];
    
}
