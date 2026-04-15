import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import configuration from './config/config';
import { ClientsModule } from './modules/clients/clients.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    // 1. Config Setup
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // 2. Database Setup (Neon/Postgres)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.url'),
        autoLoadEntities: true,
        synchronize: true, // Use false + migrations for production
        ssl: true,
      }),
      inject: [ConfigService],
    }),

    // 3. Queue Setup (Upstash/Redis)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get('redis.url'),
        },
      }),
      inject: [ConfigService],
    }),

    // 4. Feature Modules
    ClientsModule,
    ProjectsModule,
    NotificationsModule,
    DeliveryModule,
    QueueModule,
  ],
})
export class AppModule {}
