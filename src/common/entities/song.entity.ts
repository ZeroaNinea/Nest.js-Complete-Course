import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Artist } from './artist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @JoinTable({ name: 'songs_artists' })
  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  artists: Artist[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: string;

  @Column('text')
  lyrics: string;
}
