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
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        userId: Number(data.userId),
        image: data.image,
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
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
    data: {
      name?: string;
      description?: string;
      image?: string;
      userId: number;
    },
  ) {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        userId: Number(data.userId),
        image: data.image,
      },
    });
  }

  async delete(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.delete({ where: { id } });
  }
}
