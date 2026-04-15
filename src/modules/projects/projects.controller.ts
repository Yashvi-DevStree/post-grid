import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from '../../common/dtos/create-project.dto';
import { ProjectWithApiKeyDto } from '../../common/dtos/create-project.dto';
// import { ApiKeyGuard } from '../../common/guards/api-key.guard'; // Optional: protect if needed

@Controller('clients/:clientId/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  async create(
    @Param('clientId') clientId: string,
    @Body() dto: CreateProjectDto,
  ): Promise<ProjectWithApiKeyDto> {
    return this.projectsService.createProject(clientId, dto);
  }
}
