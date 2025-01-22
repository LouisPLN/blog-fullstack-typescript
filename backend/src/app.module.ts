import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}