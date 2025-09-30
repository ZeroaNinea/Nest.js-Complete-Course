import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Album, AlbumDocument } from '../common/schemas/album.model';
import { CreateAlbumDto } from '../common/dto/create-album.dto';
import { Song } from '../common/schemas/song.model';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.albumModel.create(createAlbumDto);
  }

  async findAlbums(): Promise<Album[]> {
    const album = await this.albumModel
      .find()
      .populate('songs', null, Song.name)
      .exec();

    if (!album) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }

    return album;
  }
}
