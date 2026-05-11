import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('disposicion_final')
export class DisposicionFinal {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    metodo!: string;

    @Column()
    empresa_encargada!: string;

    @Column()
    fecha_disposicion!: Date;

    @OneToOne(() => Recoleccion, (recoleccion) => recoleccion.id)
    recoleccion!: Recoleccion;

}
