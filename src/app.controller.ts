import { Controller, Get, UseGuards } from '@nestjs/common';

import { Req } from '@nestjs/common';
import { PopulatedUser } from './common/interface/populated-user.interface';

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
  getProfile(@Req() request: { user: PopulatedUser }) {
    return request.user;
  }
}
