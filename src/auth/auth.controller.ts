import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

import { JwtAuthGuard } from './jwt.guard';

import { PopulatedUser } from '../common/interface/populated-user.interface';
import { Enable2FAType } from '../common/aliases/enable2FAType.alias';
import { UpdateResult } from 'typeorm';

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

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(
    @Request() req: { user: { userId: number } },
  ): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request() req: { user: { userId: number } },
    @Body() ValidateTokenDto: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDto.token,
    );
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Request() req: { user: { userId: number } },
  ): Promise<UpdateResult> {
    return this.userService.disable2FA(req.user.userId);
  }
}
