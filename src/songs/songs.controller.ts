import { Controller, Get } from '@nestjs/common';

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
}
