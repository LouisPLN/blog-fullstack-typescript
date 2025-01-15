import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService, // Ajoute le PostsService
        PrismaService, // Ajoute PrismaService comme dépendance
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  // Test de base : vérifie que le service est défini
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});