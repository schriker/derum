import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook-token') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.body = {
      ...request.body,
      ...ctx.getArgs(),
    };
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(request);
    return result;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException(err);
    }

    return user;
  }
}
