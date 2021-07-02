import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { BlacklistPublisher } from 'src/blacklist-publishers/entities/blacklist-publisher.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Action } from './action.enum';
import {
  FlatComment,
  FlatEntry,
  FlatMessage,
  FlatNotification,
  FlatRoom,
} from './flatTypes';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Emoji } from 'src/emojis/entities/emoji.entity';

type Subjects =
  | InferSubjects<
      | typeof Message
      | typeof Entry
      | typeof Comment
      | typeof BlacklistPublisher
      | typeof User
      | typeof Room
      | typeof Notification
      | typeof Emoji
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    }

    if (user.isModerator) {
      can(Action.Delete, Message);
      can(Action.Delete, Entry);
      can(Action.Delete, Comment);
      can(Action.Update, Room);
    }

    can<FlatNotification>(Action.Update, Notification, {
      'user.id': user.id,
    });

    can<FlatRoom>(Action.Update, Room, {
      'author.id': user.id,
    });

    can<FlatMessage>(Action.Delete, Message, {
      'room.author.id': user.id,
    });

    cannot<FlatMessage>(Action.Delete, Message, {
      'author.isAdmin': true,
    });

    cannot<FlatMessage>(Action.Delete, Message, {
      'author.isModerator': true,
    });

    can<FlatEntry>(Action.Delete, Entry, {
      'room.author.id': user.id,
    });

    cannot<FlatEntry>(Action.Delete, Entry, {
      'author.isAdmin': true,
    });

    cannot<FlatEntry>(Action.Delete, Entry, {
      'author.isModerator': true,
    });

    can<FlatComment>(Action.Delete, Comment, {
      'author.id': user.id,
    });

    can<FlatComment>(Action.Delete, Comment, {
      'entry.room.author.id': user.id,
    });

    cannot<FlatComment>(Action.Delete, Comment, {
      'author.isAdmin': true,
    });

    cannot<FlatComment>(Action.Delete, Comment, {
      'author.isModerator': true,
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
