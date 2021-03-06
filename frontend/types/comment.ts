import { CommentFragmentFragment, VoteValueEnum } from '../generated/graphql';

export interface MapedComments extends CommentFragmentFragment {
  childrens: MapedComments[];
  entry?: {
    id: number;
    slug: string;
    room: {
      name: string;
    };
  };
}

export type CommentItemPropsType = {
  level: number;
  data: MapedComments;
  setParentId?: (id: number) => void;
  parentId?: number | null;
  searchView?: boolean;
  entryId: number;
  entryIsDeleted: boolean;
};

export type NewCommentPropsType = {
  entryId: number;
  setParentId: (id: number) => void;
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
