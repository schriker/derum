import { EntryFragmentFragment, VoteValueEnum } from '../generated/graphql';

export type EntriesItemProps = {
  data: EntryFragmentFragment;
  preview: boolean;
  fullView?: boolean;
  searchView?: boolean;
};

export type EntiresItemTitleProps = {
  link: string;
  title: string;
  image: string;
  fullView?: boolean;
  searchView?: boolean;
};

export type EntriesItemAuthorProps = {
  handleUserClick: (id: number) => void;
  color: string;
  name: string;
  id: number;
};

export type EntriesPublisherProps = {
  publisher: string;
  url: string;
};

export type EntiresItemRoomProps = {
  name: string;
  link: string;
};

export type EntriesItemVoteProps = {
  userVote: VoteValueEnum;
  id: number;
  data: EntryFragmentFragment;
  voteScore: number;
};
