import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UuidService } from 'nestjs-uuid';

@Module({
  providers: [SeedService, UuidService],
})
export class SeedModule {}
