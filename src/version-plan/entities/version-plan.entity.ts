import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('version_plan')
export class VersionPlan {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    version?: string;

    @Column()
    cambios?: string;

    @Column()
    fecha?: Date;
}
