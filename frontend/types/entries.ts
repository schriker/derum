import { HomeEntryFragmentFragment } from '../generated/graphql';

export type EntriesItemProps = {
  data: HomeEntryFragmentFragment;
  handleUserClick: (id: number) => void;
};
