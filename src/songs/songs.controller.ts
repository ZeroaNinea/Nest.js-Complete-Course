import { Controller, Post, Body } from '@nestjs/common';

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
}
