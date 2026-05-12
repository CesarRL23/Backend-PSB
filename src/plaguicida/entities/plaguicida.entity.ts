import { AccionCorrectivaPlagas } from "src/accion-correctiva-plagas/entities/accion-correctiva-plagas.entity";
import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('plaguicida')
export class Plaguicida {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    codigoRegistro!: string;

    @Column()
    nombreComercial!: string;

    @Column()
    ingredienteActivo!: string;

    @Column()
    categoriaOms!: string;

    @Column()
    dosisAplicacion!: string;

    @Column()
    registroIca!: string;

    @Column('text')
    fichaTecnicaUrl!: string;


    @OneToMany(() => AccionCorrectivaPlagas, (accionCorrectivaPlagas) => accionCorrectivaPlagas.plaguicida)
    accionesCorrectivasPlagas!: AccionCorrectivaPlagas[];

    @ManyToOne(() => ProgramaPlagas, (programaPlagas) => programaPlagas.plaguicidas)
    programaPlagas!: ProgramaPlagas;
}
