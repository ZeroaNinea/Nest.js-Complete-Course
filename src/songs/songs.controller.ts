import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';

import { Song } from '../common/schemas/song.model';
import { CreateSongDto } from '../common/dto/create-song.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.songService.delete(id);
  }
}
