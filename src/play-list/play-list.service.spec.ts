import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { Playlist } from '../playlists/playlist.entity';
import { Artist } from '../artists/artist.entity';

import { PlayListService } from './play-list.service';

describe('PlayListService', () => {
  let service: PlayListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
              type: 'sqlite',
              database: ':memory:',
              entities: [Song, Artist, User, Playlist],
              synchronize: true,
            }),
        TypeOrmModule.forFeature([Playlist, User, Song]),
      ],
      providers: [PlayListService],
    }).compile();

    service = module.get<PlayListService>(PlayListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
