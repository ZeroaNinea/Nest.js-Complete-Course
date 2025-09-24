import { Controller, Get } from '@nestjs/common';

import { Req } from '@nestjs/common';
import { PopulatedUser } from './common/interface/populated-user.interface';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  getProfile(@Req() request: { user: PopulatedUser }) {
    return request.user;
  }
}
