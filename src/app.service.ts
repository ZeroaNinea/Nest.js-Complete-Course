import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/services/dev-config/dev-config.service';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: string },
  ) {}

  getHello(): string {
    return `Hello World! ${this.devConfigService.getDBHost()}`;
  }
}
