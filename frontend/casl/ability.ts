import { Action } from './action.enum';
import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';
import { AuthorFragmentFragment } from '../generated/graphql';
import { AppAbility, Subjects } from './abilityTypes';

export default function defineAbilityFor(user: AuthorFragmentFragment) {
  const { can, cannot, build } = new AbilityBuilder<
    Ability<[Action, Subjects]>
  >(Ability as AbilityClass<AppAbility>);
  if (!user) return build();

  if (user.isAdmin) {
    can(Action.Manage, 'all');
  }

  if (user.isModerator) {
    can(Action.Delete, 'Message');
    can(Action.Delete, 'Entry');
    can(Action.Delete, 'Comment');
    can(Action.Update, 'Room');
  }

  if (!user.isAdmin && !user.isModerator) {
    can(Action.Update, 'Room', {
      'author.id': user.id,
    });

    can(Action.Delete, 'Message', {
      'room.author.id': user.id,
    });

    cannot(Action.Delete, 'Message', {
      'author.isAdmin': true,
    });

    cannot(Action.Delete, 'Message', {
      'author.isModerator': true,
    });

    can(Action.Delete, 'Entry', {
      'room.author.id': user.id,
    });

    cannot(Action.Delete, 'Entry', {
      'author.isAdmin': true,
    });

    cannot(Action.Delete, 'Entry', {
      'author.isModerator': true,
    });

    can(Action.Delete, 'Comment', {
      'author.id': user.id,
    });

    can(Action.Delete, 'Comment', {
      'room.author.id': user.id,
    });

    cannot(Action.Delete, 'Comment', {
      'author.isAdmin': true,
    });

    cannot(Action.Delete, 'Comment', {
      'author.isModerator': true,
    });
  }

  return build({
    detectSubjectType: (object) => object.__typename,
  });
}
