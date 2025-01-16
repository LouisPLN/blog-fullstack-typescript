import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Créer un utilisateur
  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.userService.create(body);
  }

  // Supprimer un utilisateur
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  // Mettre à jour un utilisateur
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { email?: string; password?: string },
  ) {
    return this.userService.updateUser(Number(id), body);
  }

  // Récupérer un utilisateur par ID
  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  // Récupérer un utilisateur par ID
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  // Récupérer tous les utilisateurs
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}
