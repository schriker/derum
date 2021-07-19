import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook-token') {
  constructor(private usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      request.body = {
        ...request.body,
        ...ctx.getArgs(),
      };
      const result = (await super.canActivate(context)) as boolean;
      await super.logIn(request);
      this.usersService.saveSession(request);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
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
