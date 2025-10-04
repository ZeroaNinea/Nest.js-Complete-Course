import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UuidService } from 'nestjs-uuid';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsService } from '../artists/artists.service';
import { JwtStrategy } from './jwt.strategy';
import { ApiKeyStrategy } from './api-key.strategy';

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Song, Artist, User, Playlist],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Song, Artist, User]),
      ],
      providers: [
        AuthResolver,
        AuthService,
        UserService,
        JwtService,
        JwtStrategy,
        ArtistsService,
        UuidService,
        ApiKeyStrategy,
        ConfigService,
        AuthResolver,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
