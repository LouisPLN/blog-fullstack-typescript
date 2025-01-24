import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import { Express } from 'express';
import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() data: { name: string; description: string; userId: number },
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpeg|jpg|png)$/ })
        .build({
          fileIsRequired: false,
        }),
    )
    image?: Express.Multer.File,
  ): Promise<Project> {
    if (image) {
      const imageUrl = `uploads/${image.filename}`;
      return this.projectsService.create({ ...data, image: imageUrl });
    } else {
      throw new BadRequestException('Image file is required');
    }
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
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() data: { name?: string; description?: string; userId: number },
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpeg|jpg|png)$/ })
        .build({
          fileIsRequired: false,
        }),
    )
    image?: Express.Multer.File,
  ): Promise<Project> {
    const imageUrl = image ? `uploads/${image.filename}` : undefined;
    return this.projectsService.update(Number(id), {
      ...data,
      image: imageUrl,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.projectsService.delete(Number(id));
  }
}
