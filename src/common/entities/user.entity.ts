import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Playlist } from './playlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string | null;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column()
  apiKey: string;

  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
