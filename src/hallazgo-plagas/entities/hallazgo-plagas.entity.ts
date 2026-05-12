import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
import { RegistroPlagas } from "src/registro-plagas/entities/registro-plagas.entity";
import { TipoPlaga } from "src/tipo-plaga/entities/tipo-plaga.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccionCorrectivaPlagas } from "src/accion-correctiva-plagas/entities/accion-correctiva-plagas.entity";

@Entity('hallazgo_plagas')
export class HallazgoPlagas {
              @PrimaryGeneratedColumn()
              id!: string;
            
              @Column()
              descripcion!: string;
            
            
              @Column()
              severidad!: string;
    
              @Column()
              estado!: string;
            
              @Column({ type: 'timestamp' })
              fecha!: Date;
            
              @ManyToOne(() => RegistroPlagas, (registroPlagas) => registroPlagas.hallazgosPlagas)
              registroPlagas!: RegistroPlagas;

              @ManyToOne(() => TipoPlaga, (tipoPlaga) => tipoPlaga.hallazgosPlagas)
              tipoPlaga!: TipoPlaga;
              
              @OneToMany(() => AccionCorrectivaPlagas, (accionCorrectivaPlagas) => accionCorrectivaPlagas.hallazgoPlagas)
              accionCorrectivaPlagas!: AccionCorrectivaPlagas[];

}
