import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('diagnostico_plagas')
export class DiagnosticoPlagas {
          @PrimaryGeneratedColumn()
          id!: string;
        
          @Column()
          nivelRiesgo!: string;
        
        
          @Column('text')
          areasEvaluadas!: string;

          @Column('text')
          plagasIdentificadas!: string;

          @Column('text')
          observaciones?: string;
        
          @Column({ type: 'timestamp' })
          fecha!: Date;
        
          @ManyToOne(() => ProgramaPlagas, (programaPlagas) => programaPlagas.diagnosticosPlagas)
          programaPlagas!: ProgramaPlagas;

}
