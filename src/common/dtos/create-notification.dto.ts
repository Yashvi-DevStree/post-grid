import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ChannelType } from '../constants/constants';

export class CreateNotificationDto {
  @IsString()
  @IsOptional()
  externalId?: string; // For idempotency

  @IsString()
  @IsNotEmpty()
  recipient!: string; // Email or Phone

  @IsEnum(ChannelType)
  channel!: ChannelType;

  @IsString()
  @IsOptional()
  templateName?: string; // e.g., "order_confirmation"

  @IsObject()
  @IsOptional()
  data!: Record<string, any>; // Variable values for the template
}

export class NotificationResponseDto {
  id!: string;
  externalId?: string;
  status!: string;
  channel!: string;
  createdAt!: Date;
}