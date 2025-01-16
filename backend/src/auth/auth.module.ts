import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Assurez-vous d'importer votre UsersService
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './jwt.startegy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Il est important de changer cette clé pour quelque chose de plus sécurisé
      signOptions: { expiresIn: '60s' }, // Vous pouvez ajuster le temps d'expiration du token
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
