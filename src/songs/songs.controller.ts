import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Inject,
  // Scope,
} from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { Song } from '../common/entities/song.entity';

import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

import type { Connection } from '../common/constants/connection';

@Controller(
  'songs',
  // { path: 'songs', scope: Scope.REQUEST }
)
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private readonly connection: Connection,
  ) {
    console.log(
      `This is CONNECTION STRING: ${this.connection.CONNECTION_STRING}`,
    );
  }

  @Post()
  create(@Body() CreateSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(CreateSongDto);
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error during fetching songs.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return await this.songsService.findOne(id);
  }

  @Put(':id')
  update() {
    return 'Update song based on id!';
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.songsService.remove(id);
  }
}
