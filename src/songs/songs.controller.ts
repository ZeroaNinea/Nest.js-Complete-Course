import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  // HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Inject,
  DefaultValuePipe,
  Query,
  UseGuards,
  Request,
  // Scope,
} from '@nestjs/common';

import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

import { Song } from '../common/entities/song.entity';

import { ArtistsJwtGuard } from '../auth/artists-jwt.guard';

import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

import type { Connection } from '../common/constants/connection';

@Controller(
  'songs',
  // { path: 'songs', scope: Scope.REQUEST }
)
@ApiTags('songs')
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
  @UseGuards(ArtistsJwtGuard)
  create(
    @Body() createSongDto: CreateSongDto,
    @Request() request: { user: { id: number; email: string } },
  ): Promise<Song | null> {
    console.log('Request user', request.user);
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song, IPaginationMeta>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return await this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.songsService.remove(id);
  }
}
