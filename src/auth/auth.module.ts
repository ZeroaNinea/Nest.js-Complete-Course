import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidService } from 'nestjs-uuid';

import { User } from '../common/entities/user.entity';
import { Artist } from '../common/entities/artist.entity';

// import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { ArtistsService } from '../artists/artists.service';
import { ApiKeyStrategy } from './api-key.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Artist]),
    // JwtModule.register({
    //   secret: authConstants.secret,
    //   signOptions: { expiresIn: '1d' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || '',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    ArtistsService,
    UuidService,
    ApiKeyStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
