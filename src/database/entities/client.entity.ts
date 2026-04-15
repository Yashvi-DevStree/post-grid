import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity('clients')
export class Client extends BaseEntity {
    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password_hash!: string;

    @Column({ default: true })
    is_active!: boolean;

    @OneToMany(() => Project, (project) => project.client)
    projects!: Project[];
}
