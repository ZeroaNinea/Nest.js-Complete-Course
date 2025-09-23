import { PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;
}
