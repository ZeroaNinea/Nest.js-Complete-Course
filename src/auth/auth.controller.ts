import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { PopulatedUser } from '../common/interface/populated-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);

    const populatedUser: PopulatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return populatedUser;
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
