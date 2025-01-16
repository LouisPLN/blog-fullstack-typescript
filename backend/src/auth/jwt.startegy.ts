import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Vérifie l'expiration du token
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // Clé secrète pour signer les tokens
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email }; // Les données utilisateur disponibles dans les requêtes protégées
  }
}