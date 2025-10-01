import { DataSourceOptions, DataSource } from 'typeorm';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

const isProd = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  // type: 'postgres',
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT || '5432', 10),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  entities: [Song, Artist, User, Playlist],
  // migrations: ['dist/db/migrations/*.js'],
  // synchronize: false,
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // entities: [path.join(__dirname, '../common/entities/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false,
  ssl: isProd ? { rejectUnauthorized: false } : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
