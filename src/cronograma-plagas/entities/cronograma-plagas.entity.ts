import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
@Entity('cronograma_plagas')
export class CronogramaPlagas {
          @PrimaryGeneratedColumn()
          id!: string;
        
          @Column()
          frecuenciaControl!: string;
        
          @Column()
          metodoControl!: string;
        
          @Column()
          responsable!: string;

          @Column()
          anioVigencia!: number;
        
    
          @ManyToOne(() => ProgramaPlagas, (programaPlagas) => programaPlagas.cronogramasPlagas)
          programaPlagas!: ProgramaPlagas;
          

}
