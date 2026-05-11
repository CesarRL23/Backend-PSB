import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('producto_quimico')
export class ProductoQuimico {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 50 })
  codigo!: string;

  @Column({ length: 200 })
  nombre!: string;

  @Column({ length: 150 })
  fabricante!: string;

  @Column({ length: 100 })
  tipo!: string;

  @Column({ name: 'grado_alimenticio', type: 'boolean', default: false })
  gradoAlimenticio!: boolean;

  @Column({ length: 50, nullable: true })
  ph!: string;

  @Column({ name: 'concentracion_recomendada', length: 100, nullable: true })
  concentracionRecomendada!: string;

  @Column({ name: 'tiempo_contacto_min', length: 100, nullable: true })
  tiempoContactoMin!: string;

  @Column({ name: 'ficha_tecnica_url', type: 'text', nullable: true })
  fichaTecnicaUrl!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
