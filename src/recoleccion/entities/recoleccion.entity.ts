import { DisposicionFinal } from "src/disposicion-final/entities/disposicion-final.entity";
import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { TipoResiduo } from "src/tipo-residuo/entities/tipo-residuo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recoleccion {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    fecha!: Date;

    @Column()
    responsable!: string;

    @Column()
    cantidad_recolectada!: number;

    @Column({ nullable: true })
    observaciones!: string;

    @ManyToOne(() => RegistroResiduo, registroResiduo => registroResiduo.recolecciones, { nullable: true })
    @JoinColumn()
    registroResiduo?: RegistroResiduo;

    @ManyToOne(() => TipoResiduo, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn()
    tipoResiduo?: TipoResiduo;

    @OneToOne(() => DisposicionFinal, disposicionFinal => disposicionFinal.recoleccion)
    disposicionFinal!: DisposicionFinal;
} 
