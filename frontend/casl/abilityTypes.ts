import { Ability } from '@casl/ability';
import {
  AuthorFragmentFragment,
  EntryFragmentFragment,
  Message,
  RoomFragmentFragment,
} from '../generated/graphql';
import { MapedComments } from '../types/comment';
import { Action } from './action.enum';

type MessageType = {
  __typename?: 'Message';
} & Pick<Message, 'id' | 'body' | 'createdAt'> & {
    author: { __typename?: 'User' } & AuthorFragmentFragment;
  };

export type AppAbility = Ability<[Action, Subjects]>;

export interface CommentAbilityType extends MapedComments {
  room: RoomFragmentFragment;
}

export interface MessageAbilityType extends MessageType {
  room: RoomFragmentFragment;
}

export interface EntryAbilityType extends EntryFragmentFragment {
  room: RoomFragmentFragment;
}

export type Subjects =
  | CommentAbilityType
  | MessageAbilityType
  | EntryAbilityType
  | RoomFragmentFragment
  | 'Comment'
  | 'Message'
  | 'Entry'
  | 'Room'
  | 'all';
