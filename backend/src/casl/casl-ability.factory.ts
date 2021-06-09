import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { Action } from './action.enum';
import { FlatEntry, FlatMessage } from './flatTypes';

type Subjects =
  | InferSubjects<typeof Message | typeof Entry | typeof User>
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
      can(Action.Manage, Message);
      can(Action.Manage, Entry);
    }

    can<FlatMessage>(Action.Manage, Message, {
      'room.author.id': user.id,
    });

    can<FlatEntry>(Action.Manage, Entry, {
      'room.author.id': user.id,
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
