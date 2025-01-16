import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Créer un post
  @Post()
  async createPost(@Body() data: { title: string; content: string; authorId: number; categories?: number[]; tags?: number[] }) {
    return this.postsService.create(data);
  }

  // Récupérer un post par ID
  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postsService.findById(id);
  }

  // Lister tous les posts
  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }
}