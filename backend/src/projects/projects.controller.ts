import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() data: { name: string; description: string; image: string; userId: number }) {
    return this.projectsService.create(data);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.projectsService.findById(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { name?: string; description?: string; image?: string }
  ) {
    return this.projectsService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.projectsService.delete(Number(id));
  }
}