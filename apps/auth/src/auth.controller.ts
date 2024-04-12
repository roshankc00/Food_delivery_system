import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { JwtLocalGuard } from './guards/local-auth-guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { Currentuser } from './currentUser.decorator';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Register the new User',
  })
  @ApiResponse({ status: 201, description: 'It will return the New User' })
  createUser(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  @UseGuards(JwtLocalGuard)
  loginUser(
    @Res({ passthrough: true }) response: Response,
    @Currentuser() user: User | null,
  ) {
    return this.authService.login(user, response);
  }

  @Post('me')
  async getme(@Currentuser() user: User | null) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() payload: any) {
    return payload?.user;
  }
}
