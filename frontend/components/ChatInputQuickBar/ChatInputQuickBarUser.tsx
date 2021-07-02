import { Box } from '@material-ui/core';
import React from 'react';
import { ChatInputQuickBarUserPropsType } from '../../types/chatInputs';
import useChatInputQuickBarStyles from './ChatInputQuickBarStyles';

const ChatInputQuickBarUser = ({
  value,
  index,
  active,
  handleClick,
}: ChatInputQuickBarUserPropsType) => {
  const classes = useChatInputQuickBarStyles();

  return (
    <Box
      onClick={() => handleClick(value, index)}
      className={`${classes.user} ${active === index ? classes.active : ''}`}
    >
      {value}
    </Box>
  );
};

export default ChatInputQuickBarUser;
