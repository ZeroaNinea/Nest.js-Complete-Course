import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { ArtistsService } from '../artists/artists.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto);

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
