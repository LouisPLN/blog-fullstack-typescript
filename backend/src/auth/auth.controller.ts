import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Route pour l'inscription (register)
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Hacher le mot de passe
    const hashedPassword = await this.authService.hashPassword(password);

    // Créer l'utilisateur
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    // Générer un JWT pour l'utilisateur enregistré
    const token = this.authService.generateJwt(user);

    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email },
      token,
    };
  }

  // Route pour la connexion (login)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Valider l'utilisateur avec email et mot de passe
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

    // Générer un JWT pour l'utilisateur connecté
    const token = this.authService.generateJwt(user);

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      token,
    };
  }
}
