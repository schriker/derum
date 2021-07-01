import { useReactiveVar } from '@apollo/client';
import { Typography } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { selectedUserVar } from '../../lib/apolloVars';
import { ChatMessageUserPropsType } from '../../types/messages';
import useChatMessageUserStyles from './ChatMessageUserStyles';

const ChatMessageUser = ({ value }: ChatMessageUserPropsType) => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const isCurrentUser = data?.me.displayName === value.split('@')[1];
  const selectedUser = useReactiveVar(selectedUserVar);
  const classes = useChatMessageUserStyles({
    isCurrentUser,
  });

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (selectedUser) return selectedUserVar(null);

    selectedUserVar(value.split('@')[1]);
  };

  return (
    <>
      {' '}
      <Typography
        onClick={handleClick}
        className={classes.wrapper}
        variant="body2"
        component="span"
      >
        {value}
      </Typography>{' '}
    </>
  );
};

export default ChatMessageUser;
