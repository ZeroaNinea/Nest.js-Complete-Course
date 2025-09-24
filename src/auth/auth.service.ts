import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { ArtistsService } from '../artists/artists.service';

import { LoginDto } from './dto/login.dto';
import { PayloadType } from '../common/interface/payload-type.interface';
import { Enable2FAType } from '../common/aliases/enable2FAType.alias';

import speakeasy from 'speakeasy';

import type { User } from '../common/entities/user.entity';

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

    const payload: PayloadType = {
      email: user.email,
      userId: user.id,
    };
    const artist = await this.artistsService.findArtist(user.id);

    if (artist) {
      payload.artistId = artist.id;
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user: User = await this.userService.findById({ id: userId });

    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }

    const secret = speakeasy.generateSecret();

    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);

    return { secret: user.twoFASecret };
  }
}
