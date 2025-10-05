import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from '../common/entities/song.entity';
import { Artist } from '../common/entities/artist.entity';
import { User } from '../common/entities/user.entity';
import { Playlist } from '../common/entities/playlist.entity';

import { SongsResolver } from './songs.resolver';
import { SongsService } from './songs.service';

import { CreateSongInput, UpdateSongInput } from '../graphql';
import { DataSource } from 'typeorm';

describe('SongsResolver', () => {
  let resolver: SongsResolver;
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Artist, Playlist, Song],
    synchronize: true,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Song, Artist, User, Playlist],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Song, Artist]),
      ],
      providers: [
        SongsResolver,
        {
          provide: SongsService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 'a uuid', title: 'Dancing Feat' }]),
            getSong: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({ id: id, title: 'Dancing' });
            }),
            createGraph: jest
              .fn()
              .mockImplementation((createSongInput: CreateSongInput) => {
                return Promise.resolve({ id: 'a uuid', ...createSongInput });
              }),
            update: jest
              .fn()
              .mockImplementation(
                (id, string, updateSongInput: UpdateSongInput) => {
                  console.log(updateSongInput, id, string);
                  return Promise.resolve({ affected: 1 });
                },
              ),

            remove: jest.fn().mockImplementation((id: string) => {
              console.log(id);
              return Promise.resolve({ affected: 1 });
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<SongsResolver>(SongsResolver);
  });

  afterAll(async () => {
    const repositories = dataSource.entityMetadatas.map((entity) =>
      dataSource.getRepository(entity.name),
    );
    await Promise.all(repositories.map((repository) => repository.clear()));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should fetch the songs', async () => {
    const songs = await resolver.getSongs();
    expect(songs).toEqual([{ id: 'a uuid', title: 'Dancing Feat' }]);
    expect(songs.length).toBe(1);
  });

  it('should create new song', async () => {
    const song = await resolver.createSong({
      title: 'You for me',
      artists: [1, 3],
      releasedDate: '2023-05-11',
      duration: '02:34',
      lyrics: "I'm your last lover.",
    });
    expect(song.title).toEqual('You for me');
  });

  it('should update the song', async () => {
    const song = await resolver.updateSong(1, { title: 'DANCING FEAT' });
    expect(song.affected).toBe(1);
  });

  it('should delete the song', async () => {
    const song = await resolver.deleteSong(1);
    expect(song.affected).toBe(1);
  });
});
