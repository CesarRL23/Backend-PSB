import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Trampa } from "src/trampa/entities/trampa.entity";
import { ProgramaPlagas } from "src/programa-plagas/entities/programa-plagas.entity";
@Entity('area_plagas')
export class AreaPlagas {
          @PrimaryGeneratedColumn('uuid')
          id!: string;
        
          @Column()
          nombre!: string;
        
          @Column()
          descripcion!: string;
        
          @Column()
          nivelRiesgo!: string;

    
          @OneToMany(() => Trampa, (trampa) => trampa.areaPlagas)
          trampas!: Trampa[];
          @ManyToOne(()=> ProgramaPlagas,(programaPlagas)=> programaPlagas.areasPlagas)
          programaPlagas!: ProgramaPlagas;
          
}
