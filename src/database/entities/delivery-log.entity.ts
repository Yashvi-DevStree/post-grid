import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity('delivery_logs')
export class DeliveryLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  status!: string; // e.g., "provider_rejected", "network_error"

  @Column({ type: 'jsonb', nullable: true })
  response_payload!: any; // Raw response from Resend/Twilio

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Notification, (notification) => notification.delivery_logs)
  notification!: Notification;

  @Column()
  notificationId!: string;
}
