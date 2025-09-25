import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';

import { UuidService } from 'nestjs-uuid';

import { User } from '../common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private uuidService: UuidService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.apiKey = this.uuidService.generate();

    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    // const user = await this.userRepository.save(userDto);
    user.password = userDto.password;

    return await this.userRepository.save(user);
  }

  async findOne(data: LoginDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Could not find user.');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Could not find user.');
    }

    return user;
  }

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      { twoFASecret: secret, enable2FA: true },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: null,
        enable2FA: false,
      },
    );
  }
}
