import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { JwtLocalGuard } from './guards/local-auth-guard';
import { UserEntity } from '../../../libs/common/src/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { Currentuser } from './currentUser.decorator';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  createUser(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  @UseGuards(JwtLocalGuard)
  loginUser(
    @Res({ passthrough: true }) response: Response,
    @Currentuser() user: UserEntity | null,
  ) {
    return this.authService.login(user, response);
  }

  @Post('me')
  async getme(@Currentuser() user: UserEntity | null) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() payload: any) {
    return payload?.user;
  }
}
