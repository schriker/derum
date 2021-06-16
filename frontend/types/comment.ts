import { CommentFragmentFragment } from '../generated/graphql';

export type CommentItemPropsType = {
  data: CommentFragmentFragment;
  setUserId: (id: number) => void;
  handleOpen: () => void;
  setParentId: (id: number) => void;
  parentId: number | null;
  entryId: number;
};

export type NewCommentPropsType = {
  entryId: number;
  setParentId?: (id: number) => void;
  parentId?: number;
};

export type NewCommentInputs = {
  body: string;
};
