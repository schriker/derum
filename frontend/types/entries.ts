import { HomeEntryFragmentFragment } from '../generated/graphql';

export type EntriesItemProps = {
  data: HomeEntryFragmentFragment;
  handleUserClick: (id: number) => void;
};

export type EntiresItemTitleProps = {
  link: string;
  title: string;
  image: string;
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
  id: number;
};
