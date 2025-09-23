import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';

import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/connection';

describe('SongsController', () => {
  let controller: SongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          // entities: [Song, Artist],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Song, Artist]),
      ],
      controllers: [SongsController],
      providers: [
        SongsService,
        {
          provide: 'CONNECTION',
          useValue: connection,
        },
      ],
    }).compile();

    controller = module.get<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
