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
      onMouseOver={() => handleHover(index)}
      onClick={() => handleClick(emoji.name)}
      className={`${classes.emoji} ${
        hoveredEmoji === index ? classes.active : ''
      }`}
    >
      <img
        width={28}
        height={28}
        alt={emoji.name}
        src={`http://derum-public.s3.eu-central-1.amazonaws.com/emojis/${emoji.file}/2x`}
      />
    </Box>
  );
};

export default EmojisPickerEmoji;
