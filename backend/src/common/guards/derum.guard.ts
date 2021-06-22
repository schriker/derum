import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class DerumGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const homeRoomId = this.configService.get<string>('HOME_ROOM_ID');
    const ctx = GqlExecutionContext.create(context);
    const vars = ctx.getContext().req.body.variables;
    for (const key in vars.newArticleData) {
      if (vars.newArticleData[key].roomId === parseInt(homeRoomId))
        throw new UnauthorizedException();
    }
    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
