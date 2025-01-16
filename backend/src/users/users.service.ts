import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Créer un utilisateur
  async create(data: { email: string; password: string }) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  // Supprimer un utilisateur
  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with ID ${id} does not exist`);
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  // Mettre à jour un utilisateur
  async updateUser(id: number, data: { email?: string; password?: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with ID ${id} does not exist`);
    }
  
    const updateData: any = {};
    if (data.email) {
      updateData.email = data.email;
    }
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
  
    return await this.prisma.user.update({
      where: { id },
      data: updateData,
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
