
import { HallazgoPlagas } from "src/hallazgo-plagas/entities/hallazgo-plagas.entity";

import { Column,Entity,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_plaga')
export class TipoPlaga {
          @PrimaryGeneratedColumn('uuid')
          id!: string;
        
          @Column()
          nombre!: string;
        
          @Column()
          categoria!: string;

          @Column()
          riesgoSanitario!: string;
        
          @OneToMany(() => HallazgoPlagas, (hallazgoPlagas) => hallazgoPlagas.tipoPlaga)
          hallazgosPlagas!: HallazgoPlagas[];
          


}
