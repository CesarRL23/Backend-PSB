import { HallazgoPlagas } from "src/hallazgo-plagas/entities/hallazgo-plagas.entity";
import { Plaguicida } from "src/plaguicida/entities/plaguicida.entity";
import { Column, OneToMany, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
@Entity('accion_correctiva_plagas')
export class AccionCorrectivaPlagas {
              @PrimaryGeneratedColumn()
              id!: string;
            
              @Column()
              descripcion!: string;
            
            
              @Column()
              responsable!: string;
    
              @Column()
              estado!: string;
    
              @Column()
              prioridad!: string;
            
              @Column({ type: 'timestamp' })
              fecha!: Date;
            
              @ManyToOne(() => HallazgoPlagas, (hallazgoPlagas) => hallazgoPlagas.accionCorrectivaPlagas)
              hallazgoPlagas!: HallazgoPlagas;

              @ManyToOne(() => Plaguicida, (plaguicida) => plaguicida.accionesCorrectivasPlagas)
              plaguicida!: Plaguicida;

}
