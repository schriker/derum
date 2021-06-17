import React from 'react';
import {
  useMeQuery,
  useVoteCommentMutation,
  VoteValueEnum,
} from '../../generated/graphql';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { CommentsItemVoteProps } from '../../types/comment';
import Vote from '../Vote/Vote';

const CommentsItemVote = ({
  id,
  voteScore,
  userVote,
  data,
}: CommentsItemVoteProps): JSX.Element => {
  const { data: userData } = useMeQuery();
  const [vote] = useVoteCommentMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache, mutaionResult) => {
      cache.modify({
        id: cache.identify(data),
        fields: {
          voteScore() {
            return mutaionResult.data.voteComment.voteScore;
          },
          userVote() {
            return mutaionResult.data.voteComment.userValue === 1
              ? VoteValueEnum.UP
              : mutaionResult.data.voteComment.userValue === 0
              ? VoteValueEnum.NONE
              : VoteValueEnum.DOWN;
          },
        },
        broadcast: true,
      });
    },
  });

  const handleClick = (value: VoteValueEnum) => {
    if (!userData) return openModalVar(true);
    vote({
      variables: {
        value: value,
        commentId: id,
      },
    });
  };

  return (
    <Vote
      comments
      voteScore={voteScore}
      userVote={userVote}
      handleClick={handleClick}
    />
  );
};

export default CommentsItemVote;
