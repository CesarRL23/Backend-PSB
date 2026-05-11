import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
//import { Empresa } from '../../empresa/entities/empresa.entity';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  empresa_id!: string;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  rol!: string;

  @Column({ default: 'activo' })
  estado!: string;

  @Column({ nullable: true })
  cargo!: string;

  @Column({ nullable: true })
  firma_digitalizada!: string;

  // @ManyToOne(() => Empresa)
  // @JoinColumn({ name: 'empresa_id' })
  // empresa!: Empresa;
}