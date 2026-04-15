import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from 'src/database/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/entities/client.entity';
import { Template } from 'src/database/entities/template.entity';
import { WebhookEndpoint } from 'src/database/entities/webhook-endpoint.entity';
import { Notification } from 'src/database/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Client, Template, WebhookEndpoint, Notification])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService], 
})
export class ProjectsModule {}
