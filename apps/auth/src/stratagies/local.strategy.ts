import { Injectable, UnauthorizedException } from '@nestjs/common';
import {} from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<User> {
    try {
      return this.authService.validate(email, password);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
