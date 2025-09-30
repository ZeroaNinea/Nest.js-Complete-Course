import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Song, SongSchema } from '../common/schemas/song.model';
import { SongsService } from './songs.service';

describe('SongsService', () => {
  let service: SongsService;
  let mongodb: MongoMemoryServer;

  beforeEach(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
      ],
      providers: [SongsService],
    }).compile();

    service = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
