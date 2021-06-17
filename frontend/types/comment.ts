import { CommentFragmentFragment, VoteValueEnum } from '../generated/graphql';

export interface MapedComments extends CommentFragmentFragment {
  childrens: MapedComments[];
}

export type CommentItemPropsType = {
  level: number;
  data: MapedComments;
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

export type CommentsItemVoteProps = {
  userVote: VoteValueEnum;
  id: number;
  data: CommentFragmentFragment;
  voteScore: number;
};
