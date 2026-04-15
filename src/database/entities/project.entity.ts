import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Client } from './client.entity';
import { Template } from './template.entity';
import { Notification } from './notification.entity';
import { WebhookEndpoint } from './webhook-endpoint.entity';
import { BaseEntity } from './base.entity';
  
@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  api_secret_hash!: string; // Store hashed API key

  @Column({ nullable: true })
  webhook_secret!: string; // For signing outgoing webhooks

  @Column({ default: true })
  is_active!: boolean;

  @ManyToOne(() => Client, (client) => client.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @Column()
  client_id!: string;

  @OneToMany(() => Template, (template) => template.project)
  templates!: Template[];

  @OneToMany(() => Notification, (notification) => notification.project)
  notifications!: Notification[];

  @OneToMany(() => WebhookEndpoint, (webhook) => webhook.project)
  webhookEndpoints!: WebhookEndpoint[];
}
