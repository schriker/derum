import { Message } from 'src/messages/entities/message.entity';

export type FlatMessage = Message & {
  'room.author.id': Message['room']['author']['id'];
};
