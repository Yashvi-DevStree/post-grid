import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryLog } from '../../database/entities/delivery-log.entity';
import { ResendProvider } from '../../provider/resend.provider';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryLog])],
  providers: [ResendProvider],
  exports: [ResendProvider],
})
export class DeliveryModule {}
