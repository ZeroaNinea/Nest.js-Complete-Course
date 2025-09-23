import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
