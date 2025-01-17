import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importer PrismaModule ici

@Module({
  imports: [PrismaModule], // Ajouter PrismaModule dans imports
  providers: [UsersService], // Déclare UserService comme provider
  controllers: [UsersController], // Déclare UserController comme contrôleur
})
export class UsersModule {}