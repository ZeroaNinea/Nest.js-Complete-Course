import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';

import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
