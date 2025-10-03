import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';
import { DevConfigService } from '../src/common/services/dev-config/dev-config.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(
        `Hello World! ${new DevConfigService().getDBHost()} ${
          process.env.NODE_ENV === 'development' ? 3000 : 4000
        }`,
      );
  });
});
