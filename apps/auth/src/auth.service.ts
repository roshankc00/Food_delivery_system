import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositary: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const userExist = await this.userRepositary.findOne({
      where: {
        email: signUpDto.email,
      },
    });
    if (userExist) {
      throw new UnauthorizedException();
    }
    const password = await bcrypt.hash(signUpDto.password, 10);
    const newUser = this.userRepositary.create({
      ...signUpDto,
      password,
    });

    return this.userRepositary.save(newUser);
  }

  async login(user: UserEntity, response: Response) {
    const token = this.generateToken(user);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return { token, user };
  }

  async generateToken(user: UserEntity): Promise<string> {
    const payload = {
      userId: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const userExist = await this.userRepositary.findOne({
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
    return this.userRepositary.findOne({
      where: {
        id: id,
      },
    });
  }
}
