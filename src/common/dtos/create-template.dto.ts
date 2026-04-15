import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ChannelType } from '../constants/constants';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ChannelType)
  channel!: ChannelType;

  @IsOptional()
  @IsString()
  subject?: string; // For email

  @IsNotEmpty()
  @IsString()
  body!: string; // Template with {{variables}}

  @IsOptional()
  @IsArray()
  variables?: string[]; // e.g. ["customerName", "orderId"]
}

export class TemplateResponseDto {
  id!: string;
  name!: string;
  channel!: string;
  subject?: string;
  body!: string;
  variables?: string[];
  isActive!: boolean;
  createdAt!: Date;
}