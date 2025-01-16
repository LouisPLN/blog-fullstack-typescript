import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Hacher un mot de passe
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Nombre de tours pour le hachage
    return await bcrypt.hash(password, saltRounds);
  }

  // Valider un utilisateur (email et mot de passe)
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Comparer le mot de passe fourni avec le mot de passe haché
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // Générer un token JWT
  generateJwt(user: { id: number; email: string }): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}