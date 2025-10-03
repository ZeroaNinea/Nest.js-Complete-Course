import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { User } from '../src/common/entities/user.entity';
import { Artist } from '../src/common/entities/artist.entity';
import { Playlist } from '../src/common/entities/playlist.entity';
import { Song } from '../src/common/entities/song.entity';

import request from 'supertest';
import { App } from 'supertest/types';

import { AuthModule } from '../src/auth/auth.module';

import { dataSourceOptions } from '../src/db/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const dataSource = new DataSource(dataSourceOptions);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Artist, Playlist, Song],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Artist]),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const repositories = dataSource.entityMetadatas.map((entity) =>
      dataSource.getRepository(entity.name),
    );
    await Promise.all(repositories.map((repository) => repository.clear()));
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '12345',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('firstName', 'John');
        expect(res.body).toHaveProperty('email', 'john@example.com');
      });
  });
});
