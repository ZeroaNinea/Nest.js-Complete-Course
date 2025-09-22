import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Song } from '../common/entities/song.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
// {
//   scope: Scope.TRANSIENT,
// }
export class SongsService {
  private readonly songs: Song[] = [];

  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  create(song: Song) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    throw new Error('Error during fetching songs.');
    return this.songs;
  }
}
