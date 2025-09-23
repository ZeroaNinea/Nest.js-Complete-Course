import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
