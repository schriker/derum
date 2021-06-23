import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  InjectThrottlerOptions,
  InjectThrottlerStorage,
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GQLWSThrottlerGuard extends ThrottlerGuard {
  constructor(
    @InjectThrottlerOptions()
    protected readonly options: ThrottlerModuleOptions,
    @InjectThrottlerStorage()
    protected readonly storageService: ThrottlerStorage,
    protected readonly reflector: Reflector,
    private usersService: UsersService,
  ) {
    super(options, storageService, reflector);
  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    const userId = ctx.req.session.passport.user.id;
    const user = await this.usersService.getByIdBasic(userId);
    if (!user.isAdmin && !user.isModerator) {
      const key = this.generateKey(context, user.id.toString());
      const ttls = await this.storageService.getRecord(key);

      if (ttls.length >= limit) {
        throw new ThrottlerException(ERROR_MESSAGES.MESSAGE_LIMIT);
      }
      await this.storageService.addRecord(key, ttl);
    }

    return true;
  }
}
