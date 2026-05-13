import { ChecklistResiduo } from "src/checklist-residuos/entities/checklist-residuo.entity";
import { EvidenciaResiduo } from "src/evidencia-residuos/entities/evidencia-residuo.entity";
import { ProgramaResiduo } from "src/programa-residuos/entities/programa-residuo.entity";
import { Registro } from "src/registro/entities/registro.entity";
import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('registro_residuo')
export class RegistroResiduo {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    tipo_actividad!: string;
    @Column()
    resultado_general!: string;

    @ManyToOne(() => ProgramaResiduo, programaResiduo => programaResiduo.registros)
    programaResiduo!: ProgramaResiduo;

    
    @ManyToOne(() => Registro, registro => registro.residuos)
    registro!: Registro;
    
 
    @OneToMany(() => Recoleccion, recoleccion => recoleccion.registroResiduo)
    recolecciones!: Recoleccion[];

    @OneToMany(() => ChecklistResiduo , checklistResiduo => checklistResiduo.checklistResiduo)
    checklistResiduo!: ChecklistResiduo[];

    @OneToMany(() => EvidenciaResiduo, evidenciaResiduo => evidenciaResiduo.registroResiduo)
    evidencias!: EvidenciaResiduo[];

}
