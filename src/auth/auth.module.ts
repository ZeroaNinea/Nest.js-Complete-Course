import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidService } from 'nestjs-uuid';

import { User } from '../common/entities/user.entity';
import { Artist } from '../common/entities/artist.entity';

import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Artist]),
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    ArtistsService,
    UuidService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
