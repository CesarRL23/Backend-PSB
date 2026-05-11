import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('checklist_residuo')
export class ChecklistResiduo {
    @PrimaryColumn()
    id!: string;

    @Column()
    titulo!: string;

    @Column()
    descripcion!: string;

    @Column()
    porcentaje_cumplimiento!: number;

    @ManyToOne(() => ChecklistResiduo, (checklistResiduo) => checklistResiduo.id)
    checklistResiduo!: ChecklistResiduo;

}
