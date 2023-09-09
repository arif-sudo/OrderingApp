import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequest } from './users/dto/create-user.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() request: CreateUserRequest) {
    this.authService.login()
  }

  @Post('register')
  async register(@Body() request: CreateUserRequest) {
    this.authService.register()

  }

}
