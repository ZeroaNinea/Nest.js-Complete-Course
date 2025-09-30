import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';

import { Song, SongSchema } from '../common/schemas/song.model';

describe('SongsController', () => {
  let controller: SongsController;
  let mongodb: MongoMemoryServer;

  beforeEach(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
      ],
      controllers: [SongsController],
      providers: [SongsService],
    }).compile();

    controller = module.get<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
