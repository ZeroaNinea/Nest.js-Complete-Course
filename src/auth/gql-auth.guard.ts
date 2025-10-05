import { ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthenticationError } from '@nestjs/apollo';

import { Profile } from '../graphql';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const result: { req: Profile } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([result.req]));
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new AuthenticationError('GqlAuthGuard error');
    }

    return user as TUser;
  }
}
