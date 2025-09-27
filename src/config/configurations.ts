import dotenv from 'dotenv';
dotenv.config();

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

export default () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  entities: [Song, Artist, User, Playlist],
  secret: process.env.JWT_SECRET,
});
