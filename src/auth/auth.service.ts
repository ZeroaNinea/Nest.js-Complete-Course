import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { PopulatedUser } from '../common/interface/populated-user.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginDto: LoginDto): Promise<PopulatedUser> {
    const user = await this.userService.findOne(loginDto);

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    const populatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return populatedUser;
  }
}
