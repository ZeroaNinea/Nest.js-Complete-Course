import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { AlbumsController } from './albums.controller';
import { Album, AlbumSchema } from '../common/schemas/album.model';
import { AlbumsService } from './albums.service';

describe('AlbumsController', () => {
  let controller: AlbumsController;
  let mongodb: MongoMemoryServer;

  beforeEach(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
      ],
      controllers: [AlbumsController],
      providers: [AlbumsService],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
