import { DisposicionFinal } from "src/disposicion-final/entities/disposicion-final.entity";
import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { TipoResiduo } from "src/tipo-residuo/entities/tipo-residuo.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

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

    @Column()
    observaciones!: string;

    @Column({ name: 'registro_residuo_id', nullable: true })
    registroResiduoId?: string;

    @Column({ name: 'tipo_residuo_id', nullable: true })
    tipoResiduoId?: string;

    @ManyToOne(() => RegistroResiduo, registroResiduo => registroResiduo.recolecciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'registro_residuo_id' })
    registroResiduo!: RegistroResiduo;

    @ManyToOne(() => TipoResiduo, { onDelete: 'SET NULL', eager: true })
    @JoinColumn({ name: 'tipo_residuo_id' })
    tipoResiduo?: TipoResiduo;

    @OneToOne(() => DisposicionFinal, disposicionFinal => disposicionFinal.recoleccion)
    disposicionFinal!: DisposicionFinal;
}
