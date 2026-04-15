import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../../database/entities/notification.entity';
import { DeliveryLog } from '../../../database/entities/delivery-log.entity';
import { ResendProvider } from '../../../provider/resend.provider';
import { NotificationJobData } from '../../queue/jobs/notification.job';
import { NotificationStatus } from 'src/common/constants/constants';

@Processor('notifications')
@Injectable()
export class DeliveryProcessor extends WorkerHost {
    constructor(
        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,

        @InjectRepository(DeliveryLog)
        private deliveryLogRepo: Repository<DeliveryLog>,

        private resendProvider: ResendProvider,
    ) {
        super();
    }

    async process(job: Job<NotificationJobData>): Promise<void> {
        const { notificationId, projectId, channel, toEmail, data, templateName } =
            job.data;

        console.log(
            `Processing notification ${notificationId} for channel ${channel}`,
        );

        const notification = await this.notificationRepo.findOne({
            where: { id: notificationId },
        });

        if (!notification) {
            console.error(`Notification ${notificationId} not found`);
            return;
        }

        try {
            notification.status = NotificationStatus.QUEUED;
            await this.notificationRepo.save(notification);

            let result: any;

            if (channel === 'email') {
                // For Phase 1: Simple rendering (we'll improve with templates in Phase 2)
                const subject = templateName
                    ? `Notification: ${templateName}`
                    : 'New Notification from Your App';

                const html = this.renderBasicEmail(data);

                result = await this.resendProvider.sendEmail({
                    to: toEmail!,
                    subject,
                    html,
                });
            }

            const deliveryLog = this.deliveryLogRepo.create({
                notificationId,
                status: NotificationStatus.SENT,
                response_payload: result,
            });
            await this.deliveryLogRepo.save(deliveryLog);

            // Update notification status
            notification.status = NotificationStatus.SENT;
            await this.notificationRepo.save(notification);
        } catch (error: any) {
            const deliveryLog = this.deliveryLogRepo.create({
                notificationId,
                status: NotificationStatus.FAILED,
                response_payload: { message: error.message, stack: error.stack },
            });
            await this.deliveryLogRepo.save(deliveryLog);

            // Update notification status to failed
            notification.status = NotificationStatus.FAILED;
            await this.notificationRepo.save(notification);
            throw error;
        }
    }

    private renderBasicEmail(data: Record<string, any>): string {
        let html = `<h2>New Notification</h2><ul>`;
        for (const [key, value] of Object.entries(data)) {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        html += `</ul>`;
        return html;
    }
}