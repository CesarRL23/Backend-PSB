import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { EmpresaFumigadora } from '../../empresa-fumigadora/entities/empresa-fumigadora.entity';
import { DiagnosticoPlagas } from '../../diagnostico-plagas/entities/diagnostico-plagas.entity';
import { CronogramaPlagas } from '../../cronograma-plagas/entities/cronograma-plagas.entity';
import { AreaPlagas } from '../../area-plagas/entities/area-plagas.entity';
import { Plaguicida } from '../../plaguicida/entities/plaguicida.entity';
import { Programa } from '../../programa/entities/programa.entity';
import { RegistroPlagas } from 'src/registro-plagas/entities/registro-plagas.entity';
@Entity('programa-plagas')
export class ProgramaPlagas {
      @PrimaryGeneratedColumn()
      id!: string;
    
      @Column()
      objetivo!: string;
    
      @Column()
      alcance!: string;
    
      @Column('text')
      procGeneral!: string;
    
      @Column({ type: 'timestamp' })
      fecha_envio!: Date;
    
      @Column({ type: 'timestamp', nullable: true })
      fecha_limite!: Date;

      @Column({ name: 'programa_id', type: 'uuid', nullable: true })
      programaId?: string;

      @OneToMany(() => EmpresaFumigadora, (empresaFumigadora) => empresaFumigadora.programaPlagas)
      empresasFumigadoras!: EmpresaFumigadora[];
      
      @OneToMany(() => DiagnosticoPlagas, (diagnosticoPlagas) => diagnosticoPlagas.programaPlagas)
      diagnosticosPlagas!: DiagnosticoPlagas[];

      @OneToMany(() => CronogramaPlagas, (cronogramaPlagas) => cronogramaPlagas.programaPlagas)
      cronogramasPlagas!: CronogramaPlagas[];

      @OneToMany(() => AreaPlagas, (areaPlagas) => areaPlagas.programaPlagas)
      areasPlagas!: AreaPlagas[];

      @OneToMany(() => Plaguicida, (plaguicida) => plaguicida.programaPlagas)
      plaguicidas!: Plaguicida[];

      @OneToMany(() => RegistroPlagas, (registroPlagas) => registroPlagas.programaPlagas)
      registrosPlagas!: RegistroPlagas[];

      @OneToOne(()=> Programa,(programa)=> programa.programaPlagas)
      @JoinColumn({ name: 'programa_id' })
      programa?: Programa;
    
}
