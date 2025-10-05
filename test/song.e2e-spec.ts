import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import request from 'supertest';
import { App } from 'supertest/types';

import { User } from '../src/common/entities/user.entity';
import { Artist } from '../src/common/entities/artist.entity';
import { Playlist } from '../src/common/entities/playlist.entity';
import { Song } from '../src/common/entities/song.entity';

import { SongsModule } from '../src/songs/songs.module';

import { CreateSongInput } from '../src/graphql';
import { SongsResolver } from '../src/songs/songs.resolver';
import { SongsService } from '../src/songs/songs.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Artist, Playlist, Song],
    synchronize: true,
  });

  const createSong = (CreateSongInput: CreateSongInput): Promise<Song> => {
    const song = new Song();
    song.title = CreateSongInput.title;
    const songRepo: Repository<Song> = app.get('SongRepository');

    return songRepo.save(song);
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Artist, Song, Playlist],
          synchronize: true,
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secretOrKey: configService.get<string>('JWT_SECRET') || '',
            signOptions: { expiresIn: '1d' },
          }),
        }),
        TypeOrmModule.forFeature([User, Artist, Song]),
        SongsModule,
      ],
      providers: [SongsResolver, SongsService],
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

  it('(Query) it should get all songs with songs query', async () => {
    const newSong = await createSong({
      title: 'You for me',
      artists: [1, 3],
      releasedDate: '2023-05-11',
      duration: '02:34',
      lyrics: "I'm your last lover.",
    });
    const queryData = {
      query: `query {
        songs {
          id
          title
        }
      }`,
    };
    const results = await request(app.getHttpServer())
      .post('/graphql')
      .send(queryData);

    expect(results.statusCode).toBe(200);
    expect(results.body).toEqual({ data: { songs: [newSong] } });
  });

  // it('(Query) it should get a song by id', async () => {
  //   const newSong = await createSong({ title: 'Animals' });
  //   const queryData = {
  //     query: `query GetSong($id: ID!){
  //       song(id: $id){
  //         title
  //         id
  //       }
  //     }`,
  //     variables: {
  //       id: newSong.id,
  //     },
  //   };
  //   const results = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send(queryData)
  //     .expect(200);

  //   expect(results.body).toEqual({ data: { song: newSong } });
  // });

  // it('(Mutation) it should create a new song', async () => {
  //   const queryData = {
  //     query: `mutation CreateSong($createSongInput: CreateSongInput!){
  //       createSong(createSongInput: $createSongInput){
  //         title
  //         id
  //       }
  //     }`,
  //     variables: {
  //       createSongInput: {
  //         title: 'Animals',
  //       },
  //     },
  //   };
  //   const results = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send(queryData)
  //     .expect(200);

  //   expect(results.body.data.createSong.title).toBe('Animals');
  // });

  // it('(Mutation) it should update existing song', async () => {
  //   const newSong = await createSong({ title: 'Animals' });
  //   const queryData = {
  //     query: `mutation UpdateSong($id: ID!, $updateSongInput: UpdateSongInput!){
  //       updateSong(id: $id, updateSongInput: $updateSongInput){
  //         affected
  //       }
  //     }`,
  //     variables: {
  //       id: newSong.id,
  //       updateSongInput: {
  //         title: 'Lover',
  //       },
  //     },
  //   };
  //   const results = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send(queryData)
  //     .expect(200);

  //   expect(results.body.data.updateSong.affected).toBe(1);
  // });

  // it('(Mutation) it should delete existing song', async () => {
  //   const newSong = await createSong({ title: 'Animals' });
  //   const queryData = {
  //     query: `mutation DeleteSong($id: ID!){
  //       deleteSong(id: $id){
  //         affected
  //       }
  //     }`,
  //     variables: {
  //       id: newSong.id,
  //     },
  //   };
  //   const results = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send(queryData)
  //     .expect(200);

  //   expect(results.body.data.deleteSong.affected).toBe(1);
  // });
});
