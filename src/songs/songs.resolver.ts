import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

import { Song } from '../common/entities/song.entity';

@Resolver()
export class SongsResolver {
  constructor(private songsService: SongsService) {}

  @Query('songs')
  async getSongs(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Query('song')
  async getSong(@Args('id') id: number): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Mutation('createSong')
  async createSong(@Args('song') song: CreateSongDto): Promise<Song> {
    return this.songsService.create(song);
  }
}
