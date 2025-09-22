import { Injectable } from '@nestjs/common';
import { Song } from '../common/interface/song.interface';

@Injectable()
// {
//   scope: Scope.TRANSIENT,
// }
export class SongsService {
  private readonly songs: Song[] = [];

  create(song: Song) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    throw new Error('Error during fetching songs.');
    return this.songs;
  }
}
