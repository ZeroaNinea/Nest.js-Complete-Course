import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

import { SongsService } from './songs.service';

import { Song } from '../common/entities/song.entity';
import {
  CreateSongInput,
  Song as SongType,
  UpdateSongInput,
  UpdateResult,
  DeleteResult,
} from '../graphql';

import { UpdateSongDto } from './dto/update-song.dto';

const pubSub = new PubSub();

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

  @Mutation('updateSong')
  async updateSong(
    @Args('id') id: number,
    @Args('updateSongInput') args: UpdateSongInput,
  ): Promise<UpdateResult> {
    const updatingData: UpdateSongDto = {
      id: id,
      title: args.title!,
      duration: args.duration!,
      lyrics: args.lyrics!,
    };

    const result = await this.songsService.update(id, updatingData);
    const updateResult: UpdateResult = {
      affected: result.affected!,
    };

    return updateResult;
  }

  @Mutation('deleteSong')
  async deleteSong(@Args('id') id: number): Promise<DeleteResult> {
    const result = await this.songsService.remove(id);

    return {
      affected: result.affected!,
    } as DeleteResult;
  }

  @Query('error')
  getError(@Args('error') error: boolean = true): string {
    if (error) {
      throw new GraphQLError('Error', {
        extensions: {
          code: 'ERROR',
        },
      });
    }

    return '';
  }

  @Subscription('songCreated')
  songCreated() {
    return pubSub.asyncIterableIterator('songCreated');
  }
}
