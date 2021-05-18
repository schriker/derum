import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Resolver,
  Subscription,
  Query,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => [Message])
  initialMessages(@Args('roomId') roomId: number) {
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
  messageAdded(@Args('roomId', { type: () => Int }) _roomId: number) {
    return this.pubSub.asyncIterator('messageAdded');
  }

  @Mutation(() => Message)
  @UseGuards(GQLSessionGuard)
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
    @CurrentUser() user: User,
    @Args('id') id: number,
  ): Promise<boolean> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const message = await this.messagesService.getById(id);
    if (!ability.can(Action.Manage, message)) throw new UnauthorizedException();
    await this.messagesService.deleteById(message.id);
    this.pubSub.publish('messageDeleted', {
      messageDeleted: message,
    });
    return true;
  }
}
