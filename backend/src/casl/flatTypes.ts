import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Photo } from 'src/photos/entities/photo.entity';

export type FlatMessage = Message & {
  'author.isAdmin': Message['author']['isAdmin'];
  'room.author.id': Message['room']['author']['id'];
  'author.isModerator': Message['author']['isModerator'];
};

export type FlatEntry = Entry & {
  'room.author.id': Entry['room']['author']['id'];
  'author.isAdmin': Entry['author']['isAdmin'];
  'author.isModerator': Entry['author']['isModerator'];
};

export type FlatComment = Comment & {
  'author.id': Comment['author']['id'];
  'author.isAdmin': Comment['author']['isAdmin'];
  'author.isModerator': Comment['author']['isModerator'];
  'entry.room.author.id': Comment['entry']['room']['author']['id'];
};

export type FlatRoom = Room & {
  'author.id': Room['author']['id'];
};

export type FlatPhoto = Photo & {
  'user.id': Photo['user']['id'];
};

export type FlatNotification = Notification & {
  'user.id': Notification['user']['id'];
};
