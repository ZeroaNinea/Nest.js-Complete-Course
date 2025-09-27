import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UuidService } from 'nestjs-uuid';

import { seedData } from '../db/seeds/data-seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly connection: DataSource,
    private uuidService: UuidService,
  ) {}

  async seed(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;
      await seedData(manager, this.uuidService);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log('Error during database seeding:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
