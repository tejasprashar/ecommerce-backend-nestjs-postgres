import { BadRequestException, Injectable } from '@nestjs/common';

import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.usersService.findByEmail(
      registerUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = await this.usersService.createUser(registerUserDto);

    return {
      message: 'User registered successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}
