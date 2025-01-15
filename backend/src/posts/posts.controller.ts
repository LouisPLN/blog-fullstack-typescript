import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Route pour créer un post
  @Post()
  async createPost(@Body() body: { title: string; content: string; authorId: number }) {
    return this.postsService.create(body);
  }

  // Route pour récupérer un post par ID
  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postsService.findById(id);
  }

  // Route pour récupérer tous les posts
  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }
}