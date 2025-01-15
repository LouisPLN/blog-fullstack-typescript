import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Déclare PrismaService comme provider
  exports: [PrismaService], // Exporte PrismaService pour qu'il soit utilisé ailleurs
})
export class PrismaModule {}