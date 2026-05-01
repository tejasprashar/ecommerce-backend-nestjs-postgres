import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
