import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Song } from '../common/entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';

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

  create(song: CreateSongDto): Promise<Song> {
    const newSong = new Song();

    newSong.title = song.title;
    newSong.artists = song.artists;
    newSong.releasedDate = song.releasedDate;
    newSong.duration = song.duration;
    newSong.lyrics = song.lyrics;

    return this.songsRepository.save(newSong);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    return song;
  }
}
