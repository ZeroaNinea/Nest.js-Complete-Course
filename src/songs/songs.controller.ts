import { Controller, Get, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll() {
    return 'Find all songs!';
  }

  @Get(':id')
  findOne() {
    return 'Fetch song based on id!';
  }

  @Put(':id')
  update() {
    return 'Update song based on id!';
  }
}
