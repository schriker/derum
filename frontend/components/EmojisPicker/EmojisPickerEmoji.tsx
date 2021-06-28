/* eslint-disable @next/next/no-img-element */
import { Box } from '@material-ui/core';
import React from 'react';
import { EmojisPickerEmojiPropsType } from '../../types/emojis';
import useEmojisPickerStyles from './EmojisStyles';

const EmojisPickerEmoji = ({
  emoji,
  handleClick,
  handleHover,
  index,
  hoveredEmoji,
}: EmojisPickerEmojiPropsType): JSX.Element => {
  const classes = useEmojisPickerStyles();

  return (
    <Box
      key={emoji.id}
      onMouseOver={handleHover ? () => handleHover(index) : null}
      onClick={handleClick ? () => handleClick(emoji.name) : null}
      className={`${classes.emoji} ${
        hoveredEmoji === index ? classes.active : ''
      }`}
    >
      <img
        width={24}
        height={24}
        alt={emoji.name}
        src={`http://derum-public.s3.eu-central-1.amazonaws.com/emojis/${emoji.file}/2x`}
      />
    </Box>
  );
};

export default EmojisPickerEmoji;
