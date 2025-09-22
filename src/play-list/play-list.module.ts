import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayListController } from './play-list.controller';
import { PlayListService } from './play-list.service';

import { Playlist } from '../playlists/playlist.entity';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListController],
  providers: [PlayListService],
})
export class PlayListModule {}
