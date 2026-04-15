import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEnum,
    IsObject,
    IsDateString,
} from 'class-validator';
import { ChannelType } from '../constants/constants'; 

export class NotifyDto {
    @IsOptional()
    @IsString()
    externalId?: string; 

    @IsOptional()
    @IsString()  
    templateName?: string;

    @IsString()
    @IsEnum(ChannelType)
    channel!: ChannelType; 

    @IsOptional()
    @IsString()
    toEmail?: string;

    @IsOptional()
    @IsString()
    toPhone?: string;

    @IsOptional()
    @IsString()
    toPushToken?: string;

    @IsOptional()
    @IsString()
    webhookUrl?: string;

    @IsObject()
    @IsNotEmpty()
    data!: Record<string, any>; // Variables to fill template

    @IsOptional()
    @IsDateString()
    scheduledAt?: string; // ISO string for future scheduling

    @IsOptional()
    priority?: number; // Default 0
}
