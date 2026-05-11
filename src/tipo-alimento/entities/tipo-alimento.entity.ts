import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tipo_alimento')
export class TipoAlimento {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    nombre?: string;

    @Column()
    descripcion?: string;

    @Column()
    nivel_riesgo?: string;

}
