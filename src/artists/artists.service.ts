import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from '../common/entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async findArtist(userId: number): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({
      user: { id: userId },
    });

    if (!artist) {
      throw new HttpException('Artist not found.', HttpStatus.NOT_FOUND);
    }

    return artist;
  }
}
