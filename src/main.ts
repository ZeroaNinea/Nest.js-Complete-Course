import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// import { SeedService } from './seed/seed.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log(' 🚀 Server started'))
  .catch((e) => console.error(e));
