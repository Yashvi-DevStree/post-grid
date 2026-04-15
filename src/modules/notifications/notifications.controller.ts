import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationResponseDto } from 'src/common/dtos/create-notification.dto';
import { NotifyDto } from 'src/common/dtos/notify.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('notify')
  @UseGuards(ApiKeyGuard)
  async notify(
    @Body() dto: NotifyDto,
    @Req() req: any,
  ): Promise<NotificationResponseDto> {
    const projectId = req.projectId;
    return this.notificationsService.createNotification(dto, projectId);
  }
}
