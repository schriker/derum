import { CommentFragmentFragment } from '../generated/graphql';

export type CommentItemPropsType = {
  data: CommentFragmentFragment;
  setUserId: (id: number) => void;
  handleOpen: () => void;
};

export type NewCommentPropsType = {
  entryId: number;
  parentId?: number;
};

export type NewCommentInputs = {
  body: string;
};
