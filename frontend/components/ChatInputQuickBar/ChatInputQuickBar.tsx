import { Box } from '@material-ui/core';
import React from 'react';
import { ChatInputQuickBarPropsType } from '../../types/chatInputs';
import EmojisPickerEmoji from '../EmojisPicker/EmojisPickerEmoji';
import useChatInputQuickBarStyles from './ChatInputQuickBarStyles';

const ChatInputQuickBar = ({
  emojis,
  matchIndex,
  handleClick,
}: ChatInputQuickBarPropsType): JSX.Element => {
  const classes = useChatInputQuickBarStyles();

  return (
    <Box className={classes.wrapper}>
      {emojis.map((emoji, index) => (
        <EmojisPickerEmoji
          key={emoji.id}
          emoji={emoji}
          index={index}
          handleClick={handleClick}
          hoveredEmoji={matchIndex}
        />
      ))}
    </Box>
  );
};

export default ChatInputQuickBar;
