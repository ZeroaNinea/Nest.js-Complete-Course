import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidService } from 'nestjs-uuid';

import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist])],
  providers: [UserService, UuidService],
  exports: [UserService],
})
export class UserModule {}
