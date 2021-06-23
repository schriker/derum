import { ForbiddenException, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Resolver,
  Subscription,
  Query,
  Context,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';
import { GQLWSThrottlerGuard } from 'src/common/guards/gql-ws-throttle.guard';
import { Throttle } from '@nestjs/throttler';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}

  @Query(() => [Message])
  initialMessages(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.messagesService.getByRoomId(roomId);
  }

  @Subscription(() => Message, {
    filter: (
      payload: { messageAdded: Message },
      variables: { roomId: number },
    ) => {
      return payload.messageAdded.room.id === variables.roomId;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageAdded(
    @Args('roomId', { type: () => Int }) roomId: number,
    @CurrentUser() user: User,
    @Context() ctx,
  ) {
    if (user) {
      this.usersService.addOnlineUser(user, roomId, ctx.req.cId);
    }
    return this.pubSub.asyncIterator('messageAdded');
  }

  @Mutation(() => Message)
  @UseGuards(GQLSessionGuard, GQLWSThrottlerGuard)
  @Throttle(2, 10)
  async createMessage(
    @Args('newMessageData') newMessageData: NewMessageInput,
    @CurrentUser() user: User,
  ): Promise<Message> {
    const message = await this.messagesService.create(newMessageData, user);
    this.pubSub.publish('messageAdded', {
      messageAdded: message,
    });
    return message;
  }

  @Subscription(() => Message, {
    filter: (
      payload: { messageDeleted: Message },
      variables: { roomId: number },
    ) => {
      return payload.messageDeleted.room.id === variables.roomId;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageDeleted(@Args('roomId', { type: () => Int }) _roomId: number) {
    return this.pubSub.asyncIterator('messageDeleted');
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async deleteMessage(
    @CurrentUser() session: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const message = await this.messagesService.getById(id);
    const user = await this.usersService.getByIdBasic(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, message)) throw new ForbiddenException();
    await this.messagesService.deleteById(message.id);
    this.pubSub.publish('messageDeleted', {
      messageDeleted: message,
    });
    return true;
  }
}
