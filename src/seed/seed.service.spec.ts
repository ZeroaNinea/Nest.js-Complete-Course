import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';
import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';

import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Playlist, Song, Artist]),
      ],
      providers: [SeedService],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
