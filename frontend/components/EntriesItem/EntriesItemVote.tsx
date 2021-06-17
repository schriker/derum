import React from 'react';
import {
  useMeQuery,
  useVoteMutation,
  VoteValueEnum,
} from '../../generated/graphql';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { EntriesItemVoteProps } from '../../types/entries';
import Vote from '../Vote/Vote';

const EntriesItemVote = ({
  id,
  voteScore,
  userVote,
  data,
}: EntriesItemVoteProps): JSX.Element => {
  const { data: userData } = useMeQuery();
  const [vote] = useVoteMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache, mutaionResult) => {
      cache.modify({
        id: cache.identify(data),
        fields: {
          voteScore() {
            return mutaionResult.data.vote.voteScore;
          },
          userVote() {
            return mutaionResult.data.vote.userValue === 1
              ? VoteValueEnum.UP
              : mutaionResult.data.vote.userValue === 0
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
        entryId: id,
      },
    });
  };

  return (
    <Vote voteScore={voteScore} userVote={userVote} handleClick={handleClick} />
  );
};

export default EntriesItemVote;
