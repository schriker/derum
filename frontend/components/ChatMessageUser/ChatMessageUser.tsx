import { Typography } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { ChatMessageUserPropsType } from '../../types/messages';
import useChatMessageUserStyles from './ChatMessageUserStyles';

const ChatMessageUser = ({ value }: ChatMessageUserPropsType) => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const isCurrentUser = data?.me.displayName === value.split('@')[1];
  const classes = useChatMessageUserStyles({
    isCurrentUser,
  });

  return (
    <>
      {' '}
      <Typography className={classes.wrapper} variant="body2" component="span">
        {value}
      </Typography>{' '}
    </>
  );
};

export default ChatMessageUser;
