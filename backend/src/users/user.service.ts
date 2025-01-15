import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Assurez-vous que PrismaService est configuré correctement 

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Créer un utilisateur
  async create(data: { email: string; password: string }) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // Dans un vrai projet, n'oubliez pas de hasher le mot de passe !
      },
    });
  }

  // Trouver un utilisateur par son ID
  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Trouver un utilisateur par son email
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Récupérer tous les utilisateurs
  async findAll() {
    return await this.prisma.user.findMany();
  }
}