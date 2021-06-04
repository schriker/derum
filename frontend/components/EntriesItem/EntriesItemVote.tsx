import React from 'react';
import { CardContent, Typography } from '@material-ui/core';
import useEntriesItemStyle from './EntriesItemStyles';
import { EntriesItemVoteProps } from '../../types/entries';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import PlusIcon from '../Icons/PlusIcon';
import MinusIcon from '../Icons/MinusIcon';
import numbro from 'numbro';

const EntriesItemVote = ({ id }: EntriesItemVoteProps) => {
  const classes = useEntriesItemStyle();

  return (
    <CardContent className={classes.vote}>
      <ButtonIcon color="secondary" size="small">
        <PlusIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
      <Typography className={classes.voteText} variant="subtitle1">
        {numbro(250).format({ average: true })}
      </Typography>
      <ButtonIcon color="secondary" size="small">
        <MinusIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
    </CardContent>
  );
};

export default EntriesItemVote;
