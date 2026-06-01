import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
import { Column, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
@Entity('empresa_fumigadora')
export class EmpresaFumigadora {
          @PrimaryGeneratedColumn()
          id!: string;
        
          @Column()
          nit!: string;
        
          @Column()
          nombre_empresa!: string;
        
          @Column()
          numCerSanitario!: string;

          @Column()
          registroSds: string;

          @Column()
          telefonoContacto!: string;
        
          @Column({ type: 'timestamp' })
          fechaVencCer!: Date;
        
    
          @ManyToOne(() => ProgramaPlagas, (programaPlagas) => programaPlagas.empresasFumigadoras)
          programaPlagas!: ProgramaPlagas;
          
}
