import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GQLSessionGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    try {
      if (!request.session.passport) throw new UnauthorizedException();
      if (request.session.passport.user) {
        const user = await this.usersService.getById(
          request.session.passport.user.id,
        );
        if (user.isBanned) {
          throw new ForbiddenException(ERROR_MESSAGES.BANNED);
        }
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
