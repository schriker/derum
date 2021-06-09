import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';

export type FlatMessage = Message & {
  'room.author.id': Message['room']['author']['id'];
};

export type FlatEntry = Entry & {
  'room.author.id': Entry['room']['author']['id'];
};
