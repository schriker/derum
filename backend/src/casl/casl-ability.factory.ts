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
import { User } from 'src/users/entities/user.entity';
import { Action } from './action.enum';
import { FlatEntry, FlatMessage, FlatRoom } from './flatTypes';

type Subjects =
  | InferSubjects<
      | typeof Message
      | typeof Entry
      | typeof BlacklistPublisher
      | typeof User
      | typeof Room
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
      can(Action.Update, Room);
    }

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
