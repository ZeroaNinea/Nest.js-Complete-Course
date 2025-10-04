import { Resolver, Query, Args } from '@nestjs/graphql';
import { SongsService } from './songs.service';

@Resolver()
export class SongsResolver {
  constructor(private songsService: SongsService) {}

  @Query('songs')
  async getSongs() {
    return this.songsService.findAll();
  }

  @Query('song')
  async getSong(@Args('id') id: number) {
    return this.songsService.findOne(id);
  }
}
