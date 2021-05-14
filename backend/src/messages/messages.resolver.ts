import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @Mutation(() => Message)
  createMessage(
    @Args('newMessageData') newMessageData: NewMessageInput,
  ): Promise<Message> {
    return this.messagesService.create(newMessageData);
  }
}
