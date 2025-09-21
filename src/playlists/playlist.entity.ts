import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from 'src/users/user.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playList)
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
