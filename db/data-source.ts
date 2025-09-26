import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm/browser';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
