import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UuidService } from 'nestjs-uuid';

import { UserService } from './user.service';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          // entities: [Song, Artist],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Playlist]),
      ],
      providers: [UserService, UuidService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
