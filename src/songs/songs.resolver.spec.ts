import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

import { SongsResolver } from './songs.resolver';
import { SongsService } from './songs.service';

describe('SongsResolver', () => {
  let resolver: SongsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Song, Artist, User, Playlist],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Song, Artist]),
      ],
      providers: [SongsResolver, SongsService],
    }).compile();

    resolver = module.get<SongsResolver>(SongsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
