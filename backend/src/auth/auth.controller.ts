import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    const token = this.authService.generateJwt(user);

    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email },
      token,
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log(`No user found with email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateJwt(user);

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      token,
    };
  }
}
