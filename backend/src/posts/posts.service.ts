import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string; image: string; tags: string[]; categories: string[]; authorId: number }): Promise<Post> {
    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        tags: data.tags,
        categories: data.categories,
        authorId: data.authorId,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, data: { title?: string; content?: string; image?: string; tags?: string[]; categories?: string[] }): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return await this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return await this.prisma.post.delete({
      where: { id },
    });
  }
}