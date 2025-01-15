// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';

// @Injectable()
// export class PostsService {
//   constructor(private prisma: PrismaService) {}

//   async createPost(title: string, content: string) {
//     return await this.prisma.post.create({
//       data: {
//         title,
//         content,
//       },
//     });
//   }

//   async getPosts() {
//     return await this.prisma.post.findMany();
//   }
// }