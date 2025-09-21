import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

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
  findOne() {
    return 'Fetch song based on id!';
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
