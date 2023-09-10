import { Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './users/schemas/user.schema';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common/decorators';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import JwtAuthGuard from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user
  }

}
// MessagePattern:
// Use MessagePattern when you want to implement request-response communication between microservices. This is similar to making an HTTP request and receiving a response.
// It's typically used for scenarios where you send a request and expect a specific response from the microservice you're communicating with.
// .send()

// EventPattern:
// Use EventPattern when you want to implement event-based communication between microservices. This is similar to publishing events and having other microservices subscribe to those events.
// .emit()


