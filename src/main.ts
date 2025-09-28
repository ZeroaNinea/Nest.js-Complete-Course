import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  /* Seeding */
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  /* Swagger */
  // Swagger is needed to see your API paths and DTOs in the browser. Use it only in development.
  const config = new DocumentBuilder()
    .setTitle('Postgres')
    .setDescription('The Postgres API documentation.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
