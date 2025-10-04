import { Resolver, Query } from '@nestjs/graphql';
import { SongsService } from './songs.service';

@Resolver()
export class SongsResolver {
  constructor(private songsService: SongsService) {}

  @Query('songs')
  async getSongs() {
    return this.songsService.findAll();
  }
}
