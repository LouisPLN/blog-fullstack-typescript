import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Créer un post avec des relations (par exemple, des catégories, des tags)
  async create(data: {
    title: string;
    content: string;
    authorId: number;
    categories?: number[];
    tags?: number[];
  }) {

        // // Vérifier si l'auteur existe (par exemple, avec l'ID de l'utilisateur)
        // const authorExists = await this.prisma.user.findUnique({ where: { id: data.authorId } });
        // if (!authorExists) {
        //   throw new Error('User not found');
        // }
    
        // // Créer ou trouver les tags
        // const tagsToCreate = [];
        // for (let tag of data.tags || []) {
        //   let existingTag = await this.prisma.tag.findUnique({ where: { name: tag } });
        //   if (!existingTag) {
        //     // Si le tag n'existe pas, le créer
        //     existingTag = await this.prisma.tag.create({
        //       data: { name: tag }
        //     });
        //     tagsToCreate.push(existingTag);
        //   } else {
        //     tagsToCreate.push(existingTag);
        //   }
        // }


    const uniqueTags = [...new Set(data.tags)];
    const uniqueCategory = [...new Set(data.categories)];

    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
        categories: {
          connect: uniqueCategory?.map((id) => ({ id })),
        },
        tags: {
          connect: uniqueTags?.map((id) => ({ id })),
        },
      },
    });
  }

  // Récupérer un post par ID avec ses relations (comments, categories, tags)
  async findById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        comments: true,
        categories: true,
        tags: true,
      },
    });

    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }

    return post;
  }

  // Lister tous les posts avec leurs relations
  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        comments: true,
        categories: true,
        tags: true,
      },
    });
  }
}
