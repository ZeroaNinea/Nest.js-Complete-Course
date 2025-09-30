import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Song, SongDocument } from '../common/schemas/song.model';
import { CreateSongDto } from '../common/dto/create-song-dto';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

  async create(createSongDto: CreateSongDto) {
    const song = await this.songModel.create(createSongDto);
    return song;
  }

  async find(): Promise<Song[]> {
    return this.songModel.find().exec();
  }
}
