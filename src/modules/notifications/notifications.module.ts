import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities/notification.entity';
import { BullModule } from '@nestjs/bullmq';
import { Project } from 'src/database/entities/project.entity';
import { Client } from 'src/database/entities/client.entity';
import { ProjectsService } from '../projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Project, Client]),
    BullModule.registerQueue({
      name: 'notifications',
    })
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, ProjectsService],
})
export class NotificationsModule {}
