import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    content: string;
    image: string;
    tags: string[] | string;
    categories: string[] | string;
    authorId: number;
  }): Promise<Post> {
    data.tags =
      typeof data.tags === 'string' ? data.tags.split(',') : data.tags;
    data.categories =
      typeof data.categories === 'string'
        ? data.categories.split(',')
        : data.categories;

    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        tags: data.tags,
        categories: data.categories,
        authorId: Number(data.authorId),
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(
    id: number,
    data: {
      title?: string;
      content?: string;
      image?: string;
      tags?: string[] | string;
      categories?: string[] | string;
      authorId?: number;
    },
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.image !== undefined) updateData.image = data.image;

    if (data.tags !== undefined) {
      updateData.tags = Array.isArray(data.tags)
        ? data.tags
        : data.tags.split(',').map((tag) => tag.trim());
    }

    if (data.categories !== undefined) {
      updateData.categories = Array.isArray(data.categories)
        ? data.categories
        : data.categories.split(',').map((category) => category.trim());
    }

    if (data.authorId !== undefined) {
      updateData.author = { connect: { id: Number(data.authorId) } };
    }

    return await this.prisma.post.update({
      where: { id },
      data: updateData,
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
