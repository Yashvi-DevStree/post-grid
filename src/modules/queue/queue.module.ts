import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('UPSTASH_REDIS_URL');

        return {
          connection: {
            url: redisUrl,
            maxRetriesPerRequest: null, 
            enableReadyCheck: false, 
            tls: {}, 
          },
          // Optional: default job options
          defaultJobOptions: {
            removeOnComplete: { count: 100 }, // Keep last 100 completed jobs
            removeOnFail: { count: 50 }, // Keep last 50 failed jobs
            attempts: 3, // Initial retry attempts
            backoff: { type: 'exponential', delay: 1000 },
          },
        };
      },
    }),

    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
