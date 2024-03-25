import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { PrismaService } from '@app/common';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  @UseGuards(JwtAuthGuard)
  async signUp(signUpDto: SignUpDto) {
    const userExist = this.prismaService.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });
    if (userExist) {
      throw new UnauthorizedException();
    }
    const password = await bcrypt.hash(signUpDto.password, 10);
  }

  async login(user: User, response: Response) {
    const token = await this.generateToken(user);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
    return { user, token };
  }

  async generateToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const userExist = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!userExist) {
      throw new UnauthorizedException();
    }

    const isPasswordWordCorrect = bcrypt.compare(password, userExist.password);
    if (!isPasswordWordCorrect) {
      throw new UnauthorizedException();
    }
    return userExist;
  }

  async getSingleUser(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
