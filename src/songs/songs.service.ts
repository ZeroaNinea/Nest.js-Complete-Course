import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Song, SongDocument } from '../common/schemas/song.model';
import { CreateSongDto } from '../common/dto/create-song.dto';
import { UpdateSongDto } from '../common/dto/update-song.dto';

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

  async findById(id: string): Promise<Song> {
    const song = await this.songModel.findById(id).exec();

    if (!song) {
      throw new HttpException('Song not found.', HttpStatus.NOT_FOUND);
    }

    return song;
  }

  async delete(id: string) {
    return this.songModel.deleteOne({ _id: id });
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    return this.songModel.updateOne({ _id: id }, updateSongDto);
  }
}
