import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm/browser';

import dotenv from 'dotenv';
dotenv.config();

import { Song } from '../src/common/entities/song.entity';
import { Artist } from '../src/common/entities/artist.entity';
import { User } from '../src/common/entities/user.entity';
import { Playlist } from '../src/common/entities/playlist.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Song, Artist, User, Playlist],
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
