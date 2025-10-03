import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../src/common/entities/user.entity';
import { Artist } from '../src/common/entities/artist.entity';
import { Playlist } from '../src/common/entities/playlist.entity';
import { Song } from '../src/common/entities/song.entity';

import request from 'supertest';
import { App } from 'supertest/types';

import { AuthModule } from '../src/auth/auth.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '12345',
      })
      .expect(200)
      .expect('Hello World!');
  });
});
