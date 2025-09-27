import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';

import bcrypt from 'bcryptjs';
import { UuidService } from 'nestjs-uuid';

import { Playlist } from '../../common/entities/playlist.entity';
import { Artist } from '../../common/entities/artist.entity';
import { User } from '../../common/entities/user.entity';

export const seedData = async (manager: EntityManager): Promise<void> => {
  await seedUser();
  await seedArtist();
  await seedPlayLists();

  const uuidService = new UuidService();

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuidService.generate();

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuidService.generate();

    const artist = new Artist();
    artist.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedPlayLists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuidService.generate();

    const playList = new Playlist();
    playList.name = faker.music.genre();
    playList.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playList);
  }
};
