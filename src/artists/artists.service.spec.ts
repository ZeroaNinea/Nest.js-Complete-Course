import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artist } from '../common/entities/artist.entity';

import { ArtistsService } from './artists.service';

describe('ArtistsService', () => {
  let service: ArtistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Artist]),
      ],
      providers: [ArtistsService],
    }).compile();

    service = module.get<ArtistsService>(ArtistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
