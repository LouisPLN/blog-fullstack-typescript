import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importer PrismaModule ici

@Module({
  imports: [PrismaModule], // Ajouter PrismaModule dans imports
  providers: [UserService], // Déclare UserService comme provider
  controllers: [UserController], // Déclare UserController comme contrôleur
})
export class UserModule {}