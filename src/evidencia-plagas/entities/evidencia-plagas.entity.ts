import { RegistroPlagas } from "src/registro-plagas/entities/registro-plagas.entity";
import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
@Entity('evidencia_plagas')
export class EvidenciaPlagas {
          @PrimaryGeneratedColumn()
          id!: string;
        
          @Column()
          tipoArchivo!: string;
        
          @Column()
          urlArchivo!: string;
        
          @Column()
          descripcion!: string;
        
          @Column({ type: 'timestamp' })
          fecha_carga!: Date;
        
          @ManyToOne(() => RegistroPlagas, (registroPlagas) => registroPlagas.evidenciasPlagas)
          registroPlagas!: RegistroPlagas;
          
}
