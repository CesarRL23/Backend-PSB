import { AreaPlagas } from "src/area-plagas/entities/area-plagas.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('trampa')
export class Trampa {
          @PrimaryGeneratedColumn()
          id!: string;
        
          @Column()
          codigo!: string;
        
          @Column()
          tipo!: string;
        
          @Column()
          ubicacion!: string;

          @Column()
          estado!: string;
        
          @Column({ type: 'timestamp' })
          fecha_instalacion!: Date;
        
          @Column({ type: 'timestamp'})
          fecha_revision!: Date;
    
          @ManyToOne(() => AreaPlagas, (areaPlagas) => areaPlagas.trampas)
          areaPlagas!: AreaPlagas;

}
