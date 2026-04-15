import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../../database/entities/notification.entity';
import { NotifyDto } from 'src/common/dtos/notify.dto';
import { NotificationResponseDto } from '../../common/dtos/create-notification.dto';
import { NotificationJobData } from '../queue/jobs/notification.job';
import {
  ChannelType,
  NotificationStatus,
} from '../../common/constants/constants';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectQueue('notifications')
    private notificationQueue: Queue,
  ) {}

  async createNotification(
    dto: NotifyDto,
    projectId: string,
  ): Promise<NotificationResponseDto> {
    // Phase 1: Only support email
    if (!dto.channel.includes(ChannelType.EMAIL) || !dto.toEmail) {
      throw new BadRequestException(
        'Phase 1 supports only email channel with toEmail',
      );
    }

    const notification = this.notificationRepository.create({
      project_id: projectId,
      external_id: dto.externalId,
      template_name: dto.templateName,
      channel: ChannelType.EMAIL,
      to_email: dto.toEmail,
      data: dto.data,
      status: NotificationStatus.QUEUED, 
    });

    const saved = await this.notificationRepository.save(notification);

    const jobData: NotificationJobData = {
      notificationId: saved.id,
      projectId,
      channel: ChannelType.EMAIL,
      toEmail: dto.toEmail,
      data: dto.data,
      templateName: dto.templateName,
    };

    const delay = dto.scheduledAt
      ? new Date(dto.scheduledAt).getTime() - Date.now()
      : 0;

    await this.notificationQueue.add('send-notification', jobData, {
      delay: delay > 0 ? delay : undefined,
      attempts: 5,
      backoff: { type: 'exponential', delay: 30000 },
    });

    return {
      id: saved.id,
      externalId: saved.external_id,
      status: saved.status,
      channel: saved.channel,
      createdAt: saved.created_at,
    };
  }
}
