import { Resolver } from '@nestjs/graphql';

import { SongsService } from './songs.service';

@Resolver()
export class SongsResolver {
  constructor(private songsService: SongsService) {}
}
