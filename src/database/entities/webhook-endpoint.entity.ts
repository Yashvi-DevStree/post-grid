import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity('webhook_endpoints')
export class WebhookEndpoint extends BaseEntity {
  @Column()
  url!: string;

  @Column({ default: true })
  is_active: boolean = false;

  @Column({ type: 'simple-array', nullable: true })
  events: string[] = []; // e.g., ['notification.delivered', 'notification.failed']

  @ManyToOne(() => Project)
  project!: Project;

  @Column()
  project_id!: string;
}

