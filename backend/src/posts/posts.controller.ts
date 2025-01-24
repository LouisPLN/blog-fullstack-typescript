import {
  Controller,
  Get,
  Post as PostRequest,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { Express } from 'express';
import { Post } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @PostRequest()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body()
    data: {
      title: string;
      content: string;
      tags: string[] | string;
      categories: string[] | string;
      authorId: number;
    },
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpeg|jpg|png)$/ })
        .build({
          fileIsRequired: false,
        }),
    )
    image?: Express.Multer.File,
  ): Promise<Post> {
    if (image) {
      const imageUrl = `uploads/${image.filename}`;
      return this.postService.create({ ...data, image: imageUrl });
    } else {
      throw new BadRequestException('Image file is required');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Post> {
    return this.postService.findById(Number(id));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body()
    data: {
      title?: string;
      content?: string;
      image?: string;
      tags?: string[] | string;
      categories?: string[] | string;
      authorId: number;
    },
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpeg|jpg|png)$/ })
        .build({
          fileIsRequired: false,
        }),
    )
    image?: Express.Multer.File,
  ): Promise<Post> {
    const imageUrl = image ? `uploads/${image.filename}` : undefined;
    return this.postService.update(Number(id), { ...data, image: imageUrl });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Post> {
    return this.postService.delete(Number(id));
  }
}
