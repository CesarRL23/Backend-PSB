import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity('evidencia_residuo')
export class EvidenciaResiduo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipo_archivo!: string;

    @Column()
    url!: string;

    @Column()
    descripcion!: string;

    @Column()
    fecha!: Date;

    @Column({ name: 'registro_residuo_id', nullable: true })
    registroResiduoId?: string;

    @ManyToOne(() => RegistroResiduo, registroResiduo => registroResiduo.evidencias, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'registro_residuo_id' })
    registroResiduo!: RegistroResiduo;
}
