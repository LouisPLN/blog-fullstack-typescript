import { Controller, Get, Post as PostRequest, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';

@Controller('articles')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @PostRequest()
  async create(@Body() data: { title: string; content: string; image: string; tags: string[]; categories: string[]; authorId: number }): Promise<Post> {
    return this.postService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Post> {
    return this.postService.findById(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { title?: string; content?: string; image?: string; tags?: string[]; categories?: string[] },
  ): Promise<Post> {
    return this.postService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Post> {
    return this.postService.delete(Number(id));
  }
}