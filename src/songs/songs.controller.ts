import { Controller, Delete, Get, Put, Post } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Post()
  create() {
    return 'Create a new song!';
  }

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

  @Delete(':id')
  Delete() {
    return 'Delete song based on id!';
  }
}
