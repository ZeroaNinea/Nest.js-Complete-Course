import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UuidService } from 'nestjs-uuid';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ArtistsService } from '../artists/artists.service';

import { User } from '../common/entities/user.entity';
import { Artist } from '../common/entities/artist.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Artist]),
      ],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ArtistsService,
        UuidService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
