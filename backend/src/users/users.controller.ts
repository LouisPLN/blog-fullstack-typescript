import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Créer un utilisateur
  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.userService.create(body);
  }

  // Récupérer un utilisateur par ID
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  // Récupérer tous les utilisateurs
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}