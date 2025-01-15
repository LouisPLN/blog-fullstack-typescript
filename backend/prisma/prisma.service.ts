import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient est la classe générée automatiquement par Prisma
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
