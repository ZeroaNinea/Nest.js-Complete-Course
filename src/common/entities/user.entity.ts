import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Playlist } from './playlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'User first name.',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name.',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'oKl1D@example.com',
    description: 'User email.',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password.',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: '123456',
    description: 'User 2FA secret.',
  })
  @Column({ nullable: true, type: 'text' })
  twoFASecret: string | null;

  @ApiProperty({
    example: true,
    description: 'User 2FA status.',
  })
  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @ApiProperty({
    example: '123456',
    description: 'User api key.',
  })
  @Column()
  apiKey: string;

  // @Column()
  // phone: string;

  @ApiProperty({
    type: () => [Playlist],
    description: 'User playlists.',
  })
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
