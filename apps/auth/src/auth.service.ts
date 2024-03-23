import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.Dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositary: Repository<UserEntity>,
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
    return this.userRepositary.create({
      ...signUpDto,
      password,
    });
  }

  async login(loginDto: LoginDto) {
    
  }
}
