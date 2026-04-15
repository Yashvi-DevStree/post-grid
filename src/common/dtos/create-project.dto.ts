import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ProjectResponseDto {
  id!: string;
  name!: string;
  description?: string;
  isActive!: boolean;
  createdAt!: Date;
}

export class ProjectWithApiKeyDto extends ProjectResponseDto {
  apiKey!: string; 
}
