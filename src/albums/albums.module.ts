import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Album, AlbumSchema } from '../common/schemas/album.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema,
      },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
