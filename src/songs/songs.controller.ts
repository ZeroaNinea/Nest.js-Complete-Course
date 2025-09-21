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
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

import type { Connection } from '../common/constants/connection';

@Controller('songs')
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
  create(@Body() CreateSongDto: CreateSongDto) {
    return this.songsService.create(CreateSongDto);
  }

  @Get()
  findAll() {
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
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Fetch song based on ID: ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'Update song based on id!';
  }

  @Delete(':id')
  Delete() {
    return 'Delete song based on id!';
  }
}
