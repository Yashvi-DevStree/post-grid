import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Project } from '../../database/entities/project.entity';
import { ChannelType } from 'src/common/constants/constants';
import { BaseEntity } from './base.entity';

@Entity('templates')
export class Template extends BaseEntity {

    @Column()
    name!: string; 

    @Column({ nullable: true })
    description!: string;

    @Column()
    channel!: ChannelType

    @Column({ nullable: true })
    subject!: string; // Email only

    @Column('text')
    body!: string; // Template with {{variables}}

    @Column('jsonb', { nullable: true })
    variables!: string[]; 

    @Column({ default: true })
    is_active!: boolean;

    // Relations
    @ManyToOne(() => Project, (project) => project.templates, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project!: Project;

    @Column()
    project_id!: string;
}
