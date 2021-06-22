import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { ERROR_MESSAGES } from 'src/consts/error-messages';

@Injectable()
export class GQLWSThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    const user = ctx.req.session.passport.user;
    if (!user.isAdmin && !user.isModerator) {
      const key = this.generateKey(context, user.id);
      const ttls = await this.storageService.getRecord(key);

      if (ttls.length >= limit) {
        throw new ThrottlerException(ERROR_MESSAGES.MESSAGE_LIMIT);
      }
      await this.storageService.addRecord(key, ttl);
    }

    return true;
  }
}
