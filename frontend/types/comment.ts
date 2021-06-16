import { CommentFragmentFragment } from '../generated/graphql';

export type CommentItemPropsType = {
  data: CommentFragmentFragment;
  setUserId: (id: number) => void;
  handleOpen: () => void;
};
