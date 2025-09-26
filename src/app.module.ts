import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UuidModule } from 'nestjs-uuid';
import Joi from 'joi';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Song } from './common/entities/song.entity';
import { Artist } from './common/entities/artist.entity';
import { User } from './common/entities/user.entity';
import { Playlist } from './common/entities/playlist.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/services/dev-config/dev-config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [Song, Artist, User, Playlist],
      }),
    }),
    SongsModule,
    AuthModule,
    UserModule,
    ArtistsModule,
    UuidModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DevConfigService,

    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('dbName', dataSource.driver.database);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'songs',
    //   method: RequestMethod.POST,
    // });

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
