import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Project } from './project.entity';
import { DeliveryLog } from './delivery-log.entity';
import { ChannelType, NotificationStatus } from 'src/common/constants/constants';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    external_id!: string; // Provided by client for idempotency

    @Column({ nullable: true })
    template_name!: string;

    @Column()
    channel!: ChannelType;

    @Column({ nullable: true })
    to_email!: string;

    @Column({ nullable: true })
    to_phone!: string;

    @Column({ nullable: true })
    to_push_token!: string;

    @Column({ nullable: true })
    webhook_url!: string;

    @Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PROCESSING,
    })
    status!: NotificationStatus;

    @Column({ type: 'jsonb' })
    data!: Record<string, any>; // The variables to fill in the template

    @Column({ default: 0 })
    retry_count!: number;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => Project, (project) => project.notifications)
    project!: Project;

    @Column()
    project_id!: string;

    @OneToMany(() => DeliveryLog, (log) => log.notification)
    delivery_logs!: DeliveryLog[];
}
