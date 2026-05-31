import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";

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

  @ManyToOne(() => RegistroResiduo, registroResiduo => registroResiduo.checklistResiduo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'registroResiduoId' })
  registroResiduo!: RegistroResiduo;
}
