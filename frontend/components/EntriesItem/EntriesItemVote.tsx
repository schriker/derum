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
import { openModalVar } from '../../lib/apolloVars';

const EntriesItemVote = ({ id, voteScore, userVote }: EntriesItemVoteProps) => {
  const classes = useEntriesItemStyle();
  const { data: userData } = useMeQuery();
  const [vote] = useVoteMutation();

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
        onClick={() => handleCLick(VoteValueEnum.Up)}
        color={userVote === VoteValueEnum.Up ? 'default' : 'secondary'}
        size="small"
      >
        <PlusIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
      <Typography className={classes.voteText} variant="subtitle1">
        {numbro(voteScore ? voteScore : 0).format({ average: true })}
      </Typography>
      <ButtonIcon
        onClick={() => handleCLick(VoteValueEnum.Down)}
        color={userVote === VoteValueEnum.Down ? 'default' : 'secondary'}
        size="small"
      >
        <MinusIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
    </CardContent>
  );
};

export default EntriesItemVote;
