import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    description: string;
    image: string;
    userId: number;
  }) {
    return await this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        userId: data.userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(
    id: number,
    data: { name?: string; description?: string; image?: string },
  ) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const updateData: any = {};
    if (data.name) {
      updateData.name = data.name;
    }
    if (data.description) {
      updateData.description = data.description;
    }
    if (data.image) {
      updateData.image = data.image;
    }

    return await this.prisma.project.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return await this.prisma.project.delete({
      where: { id },
    });
  }
}
