import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../user/dto/create-user.dto';

import { SignupInput, SignupResponse } from '../graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation('signup')
  async signupUser(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<SignupResponse> {
    const user = await this.userService.create(signupInput as CreateUserDto);

    return {
      email: user.email,
    };
  }
}
