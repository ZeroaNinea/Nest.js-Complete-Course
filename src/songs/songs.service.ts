import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';

import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
// {
//   scope: Scope.TRANSIENT,
// }
export class SongsService {
  private readonly songs: Song[] = [];

  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(song: CreateSongDto): Promise<Song> {
    const newSong = new Song();

    newSong.title = song.title;
    newSong.releasedDate = song.releasedDate;
    newSong.duration = song.duration;
    newSong.lyrics = song.lyrics;

    const artists = await this.artistRepository.findByIds(song.artists);
    newSong.artists = artists;

    return this.songsRepository.save(newSong);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new HttpException('Song not found.', HttpStatus.NOT_FOUND);
    }

    return song;
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return await paginate<Song>(queryBuilder, options);
  }
}
