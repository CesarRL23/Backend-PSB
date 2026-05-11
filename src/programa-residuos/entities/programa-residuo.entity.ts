import { AreaGenereacion } from "src/area-genereacion/entities/area-genereacion.entity";
import { Contenedeor } from "src/contenedeor/entities/contenedeor.entity";
import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { Residuo } from "src/residuo/entities/residuo.entity";
import { TipoResiduo } from "src/tipo-residuo/entities/tipo-residuo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('programa_residuo')
export class ProgramaResiduo {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    objetivo!: string;

    @Column()
    alcance!: string;

    @Column()
    procedimiento_general!: string;

    /*
    @OneToOne(() => Programa, programa => programa.programaResiduo)
    programa!: Programa;
    */

    @OneToMany (() => TipoResiduo, tipoResiduo => tipoResiduo.programaResiduo)
    tipoResiduos!: TipoResiduo[];

    @OneToMany(() => AreaGenereacion, areaGenereacion => areaGenereacion.programaResiduo)
    areaGenereacion!: AreaGenereacion[];

    @OneToMany(() => Contenedeor, contenedeor => contenedeor.programaResiduo)
    contenedeor!: Contenedeor[];
    
    @OneToMany(() => Residuo , residuo => residuo.programaResiduo)
    residuos!: Residuo[];

    @OneToMany(() => RegistroResiduo , registroResiduo => registroResiduo.programaResiduo)
    registros!: RegistroResiduo[];


}
