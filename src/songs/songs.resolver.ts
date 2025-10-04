import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { SongsService } from './songs.service';

import { Song } from '../common/entities/song.entity';
import { CreateSongInput, Song as SongType } from '../graphql';

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
  async createSong(
    @Args('createSongInput') song: CreateSongInput,
  ): Promise<SongType> {
    const result = await this.songsService.createGraph(song);

    const songTypeResult: SongType = {
      id: result.id.toString(),
      title: result.title,
    };

    return songTypeResult;
  }
}
