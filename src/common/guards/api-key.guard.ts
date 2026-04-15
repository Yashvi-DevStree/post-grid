import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from '../../modules/projects/projects.service';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header. Use Bearer <api-key>',
      );
    }

    const rawApiKey = authHeader.split(' ')[1];
    if (!rawApiKey) {
      throw new UnauthorizedException('API key is required');
    }

    const project = await this.projectsService.findByApiKey(rawApiKey);

    if (!project) {
      throw new UnauthorizedException('Invalid API key');
    }

    (request as any).projectId = project.id;
    (request as any).project = project;

    return true;
  }
}
