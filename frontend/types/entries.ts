import { HomeEntryFragment } from '../generated/graphql';

export type EntriesItemProps = {
  data: HomeEntryFragment;
  handleUserClick: (id: number) => void;
};
