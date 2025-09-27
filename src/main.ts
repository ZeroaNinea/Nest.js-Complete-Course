import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

declare const module: {
  hot?: {
    accept: () => void;
    dispose: (callback: () => Promise<void>) => void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap()
  .then(() => console.log(' 🚀 Server started'))
  .catch((e) => console.error(e));
