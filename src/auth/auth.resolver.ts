import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../user/dto/create-user.dto';

import {
  LoginInput,
  LoginResponse,
  Profile,
  SignupInput,
  SignupResponse,
} from '../graphql';
import { LoginDto } from './dto/login.dto';
import { GraphQLAuthGuard } from './gql-auth.guard';

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

  @Query('profile')
  @UseGuards(GraphQLAuthGuard)
  getProfile(
    parent,
    args,
    contextValue: { req: { user: Profile } },
    info,
  ): Profile {
    console.log(parent, args, info);

    const user = contextValue.req.user;
    if (!user) {
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 'UNAUTHORIZED' },
      });
    }

    return user;
  }
}
