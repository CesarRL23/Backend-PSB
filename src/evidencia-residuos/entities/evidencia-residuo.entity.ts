import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => RegistroResiduo, registroResiduo => registroResiduo.evidencias)
    registroResiduo!: RegistroResiduo;
} 
