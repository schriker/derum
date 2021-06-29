import { Box } from '@material-ui/core';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatInputQuickBarPropsType } from '../../types/chatInputs';
import EmojisPickerEmoji from '../EmojisPicker/EmojisPickerEmoji';
import useChatInputQuickBarStyles from './ChatInputQuickBarStyles';
import ChatInputQuickBarUser from './ChatInputQuickBarUser';

const ChatInputQuickBar = ({
  keyWords,
  matchIndex,
  handleClick,
}: ChatInputQuickBarPropsType): JSX.Element => {
  const classes = useChatInputQuickBarStyles();

  return (
    <Box className={classes.wrapper}>
      {keyWords.map((emoji, index) => {
        if (typeof emoji === 'string')
          return (
            <ChatInputQuickBarUser
              key={uuidv4()}
              value={emoji}
              index={index}
              active={matchIndex}
              handleClick={handleClick}
            />
          );

        return (
          <EmojisPickerEmoji
            key={emoji.id}
            emoji={emoji}
            index={index}
            handleClick={handleClick}
            hoveredEmoji={matchIndex}
          />
        );
      })}
    </Box>
  );
};

export default ChatInputQuickBar;
