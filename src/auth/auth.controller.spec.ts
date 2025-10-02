import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UuidService } from 'nestjs-uuid';

import { AuthController } from './auth.controller';
import { User } from '../common/entities/user.entity';
import { Artist } from '../common/entities/artist.entity';
import { Playlist } from '../common/entities/playlist.entity';
import { Song } from '../common/entities/song.entity';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ArtistsService } from '../artists/artists.service';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { PopulatedUser } from '../common/interface/populated-user.interface';
import { dataSourceOptions } from '../db/data-source';

describe('AuthController', () => {
  let controller: AuthController;
  const dataSource = new DataSource(dataSourceOptions);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Artist, Playlist, Song],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Artist]),
      ],
      controllers: [AuthController],
      providers: [
        UserService,
        AuthService,
        JwtService,
        ArtistsService,
        UuidService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    const repositories = dataSource.entityMetadatas.map((entity) =>
      dataSource.getRepository(entity.name),
    );
    await Promise.all(repositories.map((repository) => repository.clear()));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a new user', async () => {
    const user: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '12345',
    };

    const res: PopulatedUser = await controller.signup(user);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('firstName', 'John');
    expect(res).toHaveProperty('email', 'john@example.com');
  });
});
