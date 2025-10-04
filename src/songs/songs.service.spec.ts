import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SongsService } from './songs.service';

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

describe('SongsService', () => {
  let service: SongsService;

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
      providers: [SongsService],
    }).compile();

    service = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
