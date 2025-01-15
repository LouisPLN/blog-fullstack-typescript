import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Créer un utilisateur
  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.userService.create(body);
  }

  // Récupérer un utilisateur par ID
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  // Récupérer tous les utilisateurs
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}