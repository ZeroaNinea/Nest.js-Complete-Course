import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { ProvidersService } from './dev-config/common/providers/providers.service';
import { ProvidersService } from './dev-config/common/providers/providers.service';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService, ProvidersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'songs',
    //   method: RequestMethod.POST,
    // });

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
