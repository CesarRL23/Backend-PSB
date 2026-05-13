import { DisposicionFinal } from "src/disposicion-final/entities/disposicion-final.entity";
import { RegistroResiduo } from "src/registro-residuos/entities/registro-residuo.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => RegistroResiduo, registroResiduo => registroResiduo.recolecciones)
    registroResiduo!: RegistroResiduo;
    @OneToOne(() => DisposicionFinal, disposicionFinal => disposicionFinal.recoleccion)
    disposicionFinal!: DisposicionFinal;
} 
