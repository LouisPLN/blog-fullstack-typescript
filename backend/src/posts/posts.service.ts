import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Créer un post
  async create(data: { title: string; content: string; authorId: number }) {
    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
    });
  }

  // Récupérer un post par ID
  async findById(id: number) {
    return await this.prisma.post.findUnique({
      where: { id },
    });
  }

  // Lister tous les posts
  async findAll() {
    return await this.prisma.post.findMany();
  }
}