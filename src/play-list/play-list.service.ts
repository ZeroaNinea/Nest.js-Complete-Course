import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Playlist } from '../playlists/playlist.entity';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';

@Injectable()
export class PlayListService {
  constructor(
    @InjectRepository(Playlist) private playListRepo: Repository<Playlist>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
  ) {}
}
