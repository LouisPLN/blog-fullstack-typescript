import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return { message: 'Access granted to protected route' };
  }
  constructor(private readonly userService: UsersService) {}

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { email?: string; username?: string; password?: string },
  ) {
    return this.userService.updateUser(Number(id), body);
  }

  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}
