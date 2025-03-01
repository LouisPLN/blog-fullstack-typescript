import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { email: string; username: string; password: string }) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
      },
    });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(
    id: number,
    data: { email?: string; username?: string; password?: string },
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    const updateData: any = {};
    if (data.email) {
      updateData.email = data.email;
    }
    if (data.username) {
      updateData.username = data.username;
    }
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async findById(id: number) {
    if (!id) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, username: true, createdAt: true },
    });
  }
}
