import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from '../songs/song.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
