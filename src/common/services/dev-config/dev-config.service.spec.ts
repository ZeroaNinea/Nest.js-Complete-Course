import { Test, TestingModule } from '@nestjs/testing';
import { DevConfigService } from './dev-config.service';

describe('DevConfigService', () => {
  let service: DevConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevConfigService],
    }).compile();

    service = module.get<DevConfigService>(DevConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
