import React from 'react';
import { CardContent, Typography } from '@material-ui/core';
import useEntriesItemStyle from './EntriesItemStyles';
import { EntriesItemVoteProps } from '../../types/entries';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import PlusIcon from '../Icons/PlusIcon';
import MinusIcon from '../Icons/MinusIcon';
import numbro from 'numbro';
import {
  useMeQuery,
  useVoteMutation,
  VoteValueEnum,
} from '../../generated/graphql';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';

const EntriesItemVote = ({
  id,
  voteScore,
  userVote,
  data,
}: EntriesItemVoteProps) => {
  const classes = useEntriesItemStyle();
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

  const handleCLick = (value: VoteValueEnum) => {
    if (!userData) return openModalVar(true);
    vote({
      variables: {
        value: value,
        entryId: id,
      },
    });
  };

  return (
    <CardContent className={classes.vote}>
      <ButtonIcon
        onClick={() =>
          handleCLick(
            userVote === VoteValueEnum.UP
              ? VoteValueEnum.NONE
              : VoteValueEnum.UP
          )
        }
        color={userVote === VoteValueEnum.UP ? 'default' : 'secondary'}
        size="small"
      >
        <PlusIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
      <Typography className={classes.voteText} variant="subtitle1">
        {numbro(voteScore ? voteScore : 0).format({ average: true })}
      </Typography>
      <ButtonIcon
        onClick={() =>
          handleCLick(
            userVote === VoteValueEnum.DOWN
              ? VoteValueEnum.NONE
              : VoteValueEnum.DOWN
          )
        }
        color={userVote === VoteValueEnum.DOWN ? 'default' : 'secondary'}
        size="small"
      >
        <MinusIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
    </CardContent>
  );
};

export default EntriesItemVote;
