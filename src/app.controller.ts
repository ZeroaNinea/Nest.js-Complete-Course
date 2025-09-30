import { Controller, Get, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  getProfile(@Req() request: { user: { id: number; email: string } }) {
    return request.user;
  }
}
