import { ChecklistResiduo } from "src/checklist-residuos/entities/checklist-residuo.entity";
import { EvidenciaResiduo } from "src/evidencia-residuos/entities/evidencia-residuo.entity";
import { ProgramaResiduo } from "src/programa-residuos/entities/programa-residuo.entity";
import { Registro } from "src/registro/entities/registro.entity";
import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity('registro_residuo')
export class RegistroResiduo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    tipo_actividad!: string;
    @Column()
    resultado_general!: string;

    @Column({ name: 'programa_residuo_id', type: 'uuid', nullable: true })
    programaResiduoId?: string;

    @ManyToOne(() => ProgramaResiduo, programaResiduo => programaResiduo.registros, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'programa_residuo_id' })
    programaResiduo!: ProgramaResiduo;

    @Column({ name: 'registro_id', type: 'uuid', nullable: true })
    registroId?: string;

    @ManyToOne(() => Registro, registro => registro.residuos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'registro_id' })
    registro!: Registro;
    
    @OneToMany(() => Recoleccion, recoleccion => recoleccion.registroResiduo)
    recolecciones!: Recoleccion[];

    @OneToMany(() => ChecklistResiduo , checklistResiduo => checklistResiduo.registroResiduo)
    checklistResiduo!: ChecklistResiduo[];

    @OneToMany(() => EvidenciaResiduo, evidenciaResiduo => evidenciaResiduo.registroResiduo)
    evidencias!: EvidenciaResiduo[];
}
