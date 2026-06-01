import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { RegistroResiduo } from "../../registro-residuos/entities/registro-residuo.entity";

@Entity('checklist_residuo')
export class ChecklistResiduo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
  titulo!: string;

  @Column()
  descripcion!: string;

    @Column()
    porcentaje_cumplimiento!: number;

    @Column({ name: 'registro_residuo_id', nullable: true })
    registroResiduoId?: string;

    @ManyToOne(() => RegistroResiduo, (registroResiduo) => registroResiduo.checklistResiduo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'registro_residuo_id' })
    registroResiduo!: RegistroResiduo;
}
