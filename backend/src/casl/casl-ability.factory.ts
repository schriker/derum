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
  FlatEntry,
  FlatMessage,
  FlatNotification,
  FlatRoom,
} from './flatTypes';
import { Notification } from 'src/notifications/entities/notification.entity';

type Subjects =
  | InferSubjects<
      | typeof Message
      | typeof Entry
      | typeof Comment
      | typeof BlacklistPublisher
      | typeof User
      | typeof Room
      | typeof Notification
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

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

    can<FlatEntry>(Action.Delete, Entry, {
      'room.author.id': user.id,
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
