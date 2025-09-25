import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UuidService } from 'nestjs-uuid';

import { AuthController } from './auth.controller';
import { User } from '../common/entities/user.entity';
import { Artist } from '../common/entities/artist.entity';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ArtistsService } from '../artists/artists.service';

describe('AuthController', () => {
  let controller: AuthController;

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
      controllers: [AuthController],
      providers: [
        UserService,
        AuthService,
        JwtService,
        ArtistsService,
        UuidService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
