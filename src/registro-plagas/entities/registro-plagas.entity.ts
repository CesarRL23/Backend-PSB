import { EvidenciaPlagas } from "src/evidencia-plagas/entities/evidencia-plagas.entity";
import { HallazgoPlagas } from "src/hallazgo-plagas/entities/hallazgo-plagas.entity";
import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
import { Registro } from "src/registro/entities/registro.entity";
import { Column,Entity,OneToMany,OneToOne,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity('registro_plagas')
export class RegistroPlagas {
          @PrimaryGeneratedColumn()
          id!: string;
        
          @Column()
          TipoActividad!: string;
        
          @Column()
          resultadoGeneral!: string;
        
          @OneToMany(() => HallazgoPlagas, (hallazgoPlagas) => hallazgoPlagas.registroPlagas)
          hallazgosPlagas!: HallazgoPlagas[];
          
          @OneToMany(() => EvidenciaPlagas, (evidenciaPlagas) => evidenciaPlagas.registroPlagas)
          evidenciasPlagas!: EvidenciaPlagas[];
    
          @ManyToOne(() => Registro, (registro) => registro.plagas)
          registro!: Registro;

          @ManyToOne(() => ProgramaPlagas, (programaPlagas) => programaPlagas.registrosPlagas)
          programaPlagas!: ProgramaPlagas;


    
}
