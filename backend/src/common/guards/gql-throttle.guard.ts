import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { ERROR_MESSAGES } from 'src/consts/error-messages';

@Injectable()
export class GQLThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    // Here we start to check the amount of requests being done against the ttl.
    const { req, res } = this.getRequestResponse(context);

    // Return early if the current user agent should be ignored.
    if (Array.isArray(this.options.ignoreUserAgents)) {
      for (const pattern of this.options.ignoreUserAgents) {
        if (pattern.test(req.headers['user-agent'])) {
          return true;
        }
      }
    }
    const tracker = this.getTracker(req);
    const key = this.generateKey(context, tracker);
    const ttls = await this.storageService.getRecord(key);
    const nearestExpiryTime =
      ttls.length > 0 ? Math.ceil((ttls[0] - Date.now()) / 1000) : 0;

    // Throw an error when the user reached their limit.
    if (ttls.length >= limit) {
      res.header('Retry-After', nearestExpiryTime);
      throw new ThrottlerException(ERROR_MESSAGES.COMMENTS_LIMIT);
    }

    res.header(`${this.headerPrefix}-Limit`, limit);
    // We're about to add a record so we need to take that into account here.
    // Otherwise the header says we have a request left when there are none.
    res.header(
      `${this.headerPrefix}-Remaining`,
      Math.max(0, limit - (ttls.length + 1)),
    );
    res.header(`${this.headerPrefix}-Reset`, nearestExpiryTime);

    await this.storageService.addRecord(key, ttl);
    return true;
  }

  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }
}
