import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevConfigService } from './common/services/dev-config/dev-config.service';

const devConfig = { port: 3000 };
const proConfig = { port: 400 };

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        DevConfigService,
        {
          provide: 'CONFIG',
          useFactory: () => {
            return process.env.NODE_ENV === 'development'
              ? devConfig
              : proConfig;
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(
        `Hello World! ${new DevConfigService().getDBHost()}`,
      );
    });
  });
});
