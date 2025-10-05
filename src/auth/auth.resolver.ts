import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../user/dto/create-user.dto';

import {
  LoginInput,
  LoginResponse,
  SignupInput,
  SignupResponse,
} from '../graphql';
import { LoginDto } from './dto/login.dto';
import { GraphQLError } from 'graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation('signup')
  signupUser(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<SignupResponse> {
    return this.userService.create(signupInput as CreateUserDto);
  }

  @Query('login')
  async loginUser(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const result = (await this.authService.login(loginInput as LoginDto)) as {
      accessToken: string;
    };

    if (!result.accessToken) {
      throw new GraphQLError('Unauthorized request.', {
        extensions: {
          code: 'UNAUTHORIZED',
          message: 'Unauthorized request.',
          status: 401,
        },
      });
    }

    return {
      token: result.accessToken,
    };
  }
}
