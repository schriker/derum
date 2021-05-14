import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
  ) {}

  @Mutation(() => Message)
  async createMessage(
    @Args('newMessageData') newMessageData: NewMessageInput,
  ): Promise<Message> {
    const message = await this.messagesService.create(newMessageData);
    this.pubSub.publish('messageAdded', {
      messageAdded: message,
    });
    return message;
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
}
