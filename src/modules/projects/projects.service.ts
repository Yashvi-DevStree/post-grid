import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Project } from '../../database/entities/project.entity';
import { CreateProjectDto } from '../../common/dtos/create-project.dto';
import { ProjectWithApiKeyDto } from '../../common/dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(
    clientId: string,
    dto: CreateProjectDto,
  ): Promise<ProjectWithApiKeyDto> {
    const rawApiKey = this.generateApiKey();
    const apiKeyHash = await bcrypt.hash(rawApiKey, 12);

    const project = this.projectRepository.create({
      client_id: clientId,
      name: dto.name,
      description: dto.description,
      api_secret_hash: apiKeyHash,
      is_active: true,
    });

    const savedProject = await this.projectRepository.save(project);

    return {
      id: savedProject.id,
      name: savedProject.name,
      description: savedProject.description,
      isActive: savedProject.is_active,
      createdAt: savedProject.created_at,
      apiKey: rawApiKey, // Return only once!
    };
  }

  private generateApiKey(): string {
    // Format: np_ + 32 random hex chars (good UX + security)
    const randomBytes = crypto.randomBytes(32).toString('hex');
    return `np_${randomBytes}`;
  }

  // Used by Guard
  async findByApiKey(rawApiKey: string): Promise<Project | null> {
    const projects = await this.projectRepository.find({
      where: { is_active: true },
      relations: ['client'],
    });

    for (const project of projects) {
      const isMatch = await bcrypt.compare(rawApiKey, project.api_secret_hash);
      if (isMatch) {
        return project;
      }
    }
    return null;
  }
}
