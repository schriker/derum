import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

export type FlatMessage = Message & {
  'room.author.id': Message['room']['author']['id'];
};

export type FlatEntry = Entry & {
  'room.author.id': Entry['room']['author']['id'];
};

export type FlatRoom = Room & {
  'author.id': Room['author']['id'];
};

export type FlatNotification = Notification & {
  'user.id': Notification['user']['id'];
};
