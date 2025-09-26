import { DataSourceOptions, DataSource } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Song, Artist, User, Playlist],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
