import { AreaGenereacion } from "src/area-genereacion/entities/area-genereacion.entity";
import { Contenedeor } from "src/contenedeor/entities/contenedeor.entity";
import { ProgramaResiduo } from "src/programa-residuos/entities/programa-residuo.entity";
import { TipoResiduo } from "src/tipo-residuo/entities/tipo-residuo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('residuo')
export class Residuo {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    nombre!: string;

    @Column()
    descripcion!: string;

    @Column({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    fecha_registro!: Date;

    @Column()
    estado!: string;


    @ManyToOne(() => ProgramaResiduo, programaResiduo => programaResiduo.residuos)
    programaResiduo!: ProgramaResiduo;  

    @ManyToOne(() => Contenedeor , contenedeor => contenedeor.programaResiduo)
    contenedeor!: Contenedeor; 
    
    @ManyToOne(() => TipoResiduo , tipoResiduo => tipoResiduo.residuos)
    tipoResiduo!: TipoResiduo;

    @ManyToOne(() => AreaGenereacion , areaGenereacion => areaGenereacion.residuos)
    areaGenereacion!: AreaGenereacion;

    
}