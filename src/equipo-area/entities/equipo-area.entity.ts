import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Empresa } from '../../empresa/entities/empresa.entity';
import { ProgramaLimpieza } from '../../programa-limpieza/entities/programa-limpieza.entity';
import { RegistroLimpieza } from '../../registro-limpieza/entities/registro-limpieza.entity';

export enum TipoEquipoArea {
  AREA = 'AREA',
  EQUIPO = 'EQUIPO',
  UTENSILIO = 'UTENSILIO',
}

export enum EstadoEquipoArea {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

@Entity('equipo_area')
export class EquipoArea {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'empresa_id', type: 'uuid' })
  empresaId!: string;

  @Column({ length: 200 })
  nombre!: string;

  @Column({ type: 'enum', enum: TipoEquipoArea })
  tipo!: TipoEquipoArea;

  @Column({
    type: 'enum',
    enum: EstadoEquipoArea,
    default: EstadoEquipoArea.ACTIVO,
  })
  estado!: EstadoEquipoArea;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // ─── Relaciones ──────────────────────────────────────────────────────────────

  @ManyToOne(() => Empresa, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @OneToMany(() => ProgramaLimpieza, (pl) => pl.equipoArea)
  programasLimpieza!: ProgramaLimpieza[];

  @OneToMany(() => RegistroLimpieza, (rl) => rl.equipoArea)
  registrosLimpieza!: RegistroLimpieza[];
}
