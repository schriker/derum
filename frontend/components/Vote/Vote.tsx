import { CardContent, Typography } from '@material-ui/core';
import numbro from 'numbro';
import React from 'react';
import { VoteValueEnum } from '../../generated/graphql';
import { VotePropsType } from '../../types/vote';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import MinusIcon from '../Icons/MinusIcon';
import PlusIcon from '../Icons/PlusIcon';
import useVoteStyle from './VoteStyles';

const Vote = ({
  handleClick,
  userVote,
  voteScore,
  comments,
  disabled,
}: VotePropsType) => {
  const classes = useVoteStyle({
    justifyContent: comments ? 'start' : 'center',
  });

  return (
    <CardContent className={classes.vote}>
      <ButtonIcon
        aria-label="Vote Up"
        disabled={disabled}
        onClick={() =>
          handleClick(
            userVote === VoteValueEnum.UP
              ? VoteValueEnum.NONE
              : VoteValueEnum.UP
          )
        }
        color={userVote === VoteValueEnum.UP ? 'default' : 'secondary'}
        size="small"
      >
        <PlusIcon style={{ fontSize: 13 }} />
      </ButtonIcon>
      <Typography className={classes.voteText} variant="subtitle1">
        {numbro(voteScore ? voteScore : 0).format({ average: true })}
      </Typography>
      <ButtonIcon
        aria-label="Vote Down"
        disabled={disabled}
        onClick={() =>
          handleClick(
            userVote === VoteValueEnum.DOWN
              ? VoteValueEnum.NONE
              : VoteValueEnum.DOWN
          )
        }
        color={userVote === VoteValueEnum.DOWN ? 'default' : 'secondary'}
        size="small"
      >
        <MinusIcon style={{ fontSize: 13 }} />
      </ButtonIcon>
    </CardContent>
  );
};

export default Vote;
