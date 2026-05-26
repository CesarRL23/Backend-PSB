import { AreaGenereacion } from "src/area-genereacion/entities/area-genereacion.entity";
import { Contenedeor } from "src/contenedeor/entities/contenedeor.entity";
import { Programa } from "src/programa/entities/programa.entity";
import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { Residuo } from "src/residuo/entities/residuo.entity";
import { TipoResiduo } from "src/tipo-residuo/entities/tipo-residuo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('programa_residuo')
export class ProgramaResiduo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    objetivo!: string;

    @Column()
    alcance!: string;

    @Column()
    procedimiento_general!: string;

    @Column({ name: 'programa_id', type: 'uuid', nullable: true })
    programaId?: string;

    @OneToOne(() => Programa, programa => programa.programaResiduo)
    @JoinColumn({ name: 'programa_id' })
    programa!: Programa;
    

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
