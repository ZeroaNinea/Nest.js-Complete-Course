import { Controller, Post, Get, Body } from '@nestjs/common';

import { Song } from '../common/schemas/song.model';
import { CreateSongDto } from '../common/dto/create-song-dto';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Post()
  create(
    @Body()
    createSongDTO: CreateSongDto,
  ) {
    return this.songService.create(createSongDTO);
  }

  @Get()
  find(): Promise<Song[]> {
    return this.songService.find();
  }
}
