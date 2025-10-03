import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidService } from 'nestjs-uuid';

import { TypeOrmModule } from '@nestjs/typeorm';

import request from 'supertest';
import { App } from 'supertest/types';

import { User } from '../src/common/entities/user.entity';
import { Artist } from '../src/common/entities/artist.entity';

import { ApiKeyStrategy } from '../src/auth/api-key.strategy';

import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { UserService } from '../src/user/user.service';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { ArtistsService } from '../src/artists/artists.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Artist]), AuthModule],
      providers: [
        AuthService,
        UserService,
        JwtStrategy,
        ArtistsService,
        UuidService,
        ApiKeyStrategy,
        ConfigService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('firstName', 'John');
        expect(res.body).toHaveProperty('email', 'john@example.com');
      });
  });
});
