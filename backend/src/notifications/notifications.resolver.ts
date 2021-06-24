import { ForbiddenException, Inject, UseGuards } from '@nestjs/common';
import {
  Query,
  Int,
  Resolver,
  Subscription,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { Notification } from 'src/notifications/entities/notification.entity';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from './notifications.service';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(
    private notificationsService: NotificationsService,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}

  @Query(() => Int)
  @UseGuards(GQLSessionGuard)
  newNotificationsNumber(@CurrentUser() session: User): Promise<number> {
    return this.notificationsService.countNew(session);
  }

  @Query(() => [Notification])
  @UseGuards(GQLSessionGuard)
  notifications(@CurrentUser() session: User): Promise<Notification[]> {
    return this.notificationsService.get(session);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async readAllNotification(@CurrentUser() session: User): Promise<boolean> {
    return this.notificationsService.markAllAsReaded(session);
  }

  @Mutation(() => Notification)
  @UseGuards(GQLSessionGuard)
  async readNotification(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() session: User,
  ): Promise<Notification> {
    const user = await this.usersService.getByIdBasic(session.id);
    const notification = await this.notificationsService.getById(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Update, notification))
      throw new ForbiddenException();

    return this.notificationsService.markOneAsReaded(id);
  }

  @Subscription(() => Notification, {
    filter: (payload: { notification: Notification }, _variables, context) => {
      return (
        payload.notification.user.id === context.req.session.passport.user.id
      );
    },
  })
  notification() {
    return this.pubSub.asyncIterator('notification');
  }
}
